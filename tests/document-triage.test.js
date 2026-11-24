import test from 'node:test';
import assert from 'node:assert/strict';
import { triageDocument } from '../src/document-triage.js';

const sample = {
  type: 'appeal-or-grievance', confidence: 0.90, memberIdMatches: true,
  dateOfBirthMatches: false, claimNumberMatches: true, conflictingIdentifiers: false,
  receivedAt: '2026-11-21T23:40:00Z', expedited: true
};

test('003-US1-AS1: threshold is inclusive and lower confidence goes to a person', () => {
  assert.equal(triageDocument(sample).queue, 'appeal-or-grievance');
  assert.equal(triageDocument({ ...sample, confidence: 0.899 }).queue, 'human-review');
  assert.equal(triageDocument({ ...sample, type: 'other', confidence: 1 }).queue, 'human-review');
});

test('003-US2-AS1/2/3: matching needs corroboration and conflicts override exact matches', () => {
  assert.equal(triageDocument(sample).attachment, 'attached');
  assert.equal(triageDocument({ ...sample, claimNumberMatches: false }).attachment, 'review');
  assert.equal(triageDocument({ ...sample, memberIdMatches: false }).attachment, 'review');
  const conflict = triageDocument({ ...sample, conflictingIdentifiers: true });
  assert.equal(conflict.queue, 'privacy-hold');
  assert.equal(conflict.attachment, 'unattached');
});

test('003-US5-AS2: above 2% pauses routing; a supplied pause stays effective when the rate improves', () => {
  assert.equal(triageDocument({ ...sample, misrouteRate: 0.02 }).autoRoutingPaused, false);
  const stopped = triageDocument({ ...sample, misrouteRate: 0.024 });
  assert.equal(stopped.autoRoutingPaused, true);
  assert.equal(stopped.queue, 'human-review');
  assert.equal(stopped.alerts.length, 1);
  assert.equal(triageDocument({ ...sample, paused: true }).autoRoutingPaused, true);
});

test('003-US4-AS3: weekend clock starts at receipt; uncertain urgency is expedited', () => {
  const result = triageDocument({ ...sample, confidence: 0.5 });
  assert.equal(result.clockStartsAt, sample.receivedAt);
  assert.equal(result.priority, 'expedited');
  assert.equal(triageDocument({ ...sample, expedited: false, urgencyUncertain: true }).priority, 'expedited');
});

test('003: malformed scores, flags, types and timezone-free receipt times are rejected', () => {
  for (const change of [
    { confidence: NaN }, { threshold: 1.1 }, { misrouteRate: -1 }, { type: 'unknown' },
    { memberIdMatches: 'yes' }, { receivedAt: 'yesterday' }, { receivedAt: '2026-11-21T23:40:00' },
    { receivedAt: '2026-02-30T23:40:00Z' }, { receivedAt: '2026-11-21T24:40:00Z' }
  ]) assert.throws(() => triageDocument({ ...sample, ...change }), TypeError);
});
