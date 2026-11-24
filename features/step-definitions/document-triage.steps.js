import assert from 'node:assert/strict';
import { Given, When, Then } from '@cucumber/cucumber';
import { triageDocument } from '../../src/document-triage.js';

const document = (overrides = {}) => ({
  type: 'claim-form', confidence: 0.96, memberIdMatches: true,
  dateOfBirthMatches: false, claimNumberMatches: true, conflictingIdentifiers: false,
  receivedAt: '2026-11-21T23:40:00Z', ...overrides
});

Given('a synthetic claim form classified at {float}', function (confidence) {
  this.document = document({ confidence });
});
Given('the identifiers point to different members', function () {
  this.document.conflictingIdentifiers = true;
});
Given('its weekly misroute rate is {float}', function (misrouteRate) { this.document.misrouteRate = misrouteRate; });
Given('an expedited appeal received at {string}', function (receivedAt) {
  this.document = document({ type: 'appeal-or-grievance', receivedAt, expedited: true });
});
When('document triage runs', function () { this.triage = triageDocument(this.document); });
Then('the document queue is {string}', function (queue) { assert.equal(this.triage.queue, queue); });
Then('the document remains unattached', function () { assert.equal(this.triage.attachment, 'unattached'); });
Then('automatic routing is paused', function () { assert.equal(this.triage.autoRoutingPaused, true); });
Then('its deadline clock starts at {string}', function (receivedAt) {
  assert.equal(this.triage.clockStartsAt, receivedAt);
  assert.equal(this.triage.priority, 'expedited');
});
