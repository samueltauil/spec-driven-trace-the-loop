import { dateOnly } from './dates.js';

const TYPES = new Set([
  'claim-form', 'medical-record', 'prior-authorization',
  'appeal-or-grievance', 'provider-correspondence', 'other'
]);
const TIMED = new Set(['prior-authorization', 'appeal-or-grievance']);

export function triageDocument({
  type, confidence, threshold = 0.90, misrouteRate = 0, paused = false,
  memberIdMatches, dateOfBirthMatches, claimNumberMatches, conflictingIdentifiers,
  receivedAt, expedited = false, urgencyUncertain = false
}) {
  if (!TYPES.has(type)) throw new TypeError('Unknown document type');
  for (const [name, value] of Object.entries({ confidence, threshold, misrouteRate })) {
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      throw new TypeError(`${name} must be between zero and one`);
    }
  }
  for (const value of [
    memberIdMatches, dateOfBirthMatches, claimNumberMatches,
    conflictingIdentifiers, paused, expedited, urgencyUncertain
  ]) {
    if (typeof value !== 'boolean') throw new TypeError('Matching and routing flags must be booleans');
  }
  if (typeof receivedAt !== 'string'
    || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(receivedAt)
    || !Number.isFinite(Date.parse(receivedAt))) {
    throw new TypeError('receivedAt must be an ISO timestamp with a timezone');
  }
  dateOnly(receivedAt.slice(0, 10), 'receivedAt calendar date');
  const autoRoutingPaused = paused || misrouteRate > 0.02;
  const onHold = conflictingIdentifiers;
  return {
    queue: onHold ? 'privacy-hold'
      : type === 'other' || autoRoutingPaused || confidence < threshold ? 'human-review' : type,
    attachment: onHold ? 'unattached'
      : memberIdMatches && (dateOfBirthMatches || claimNumberMatches) ? 'attached' : 'review',
    autoRoutingPaused,
    alerts: misrouteRate > 0.02 ? ['Notify product owner; human resumption required'] : [],
    ...(TIMED.has(type) ? { clockStartsAt: receivedAt, priority: expedited || urgencyUncertain ? 'expedited' : 'normal' } : {})
  };
}
