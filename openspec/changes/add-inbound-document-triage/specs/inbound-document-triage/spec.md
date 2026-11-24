# Inbound document triage

## Purpose
Define the business rules and observable acceptance behavior for inbound document triage using fictional Contoso examples.

## ADDED Requirements

### Requirement: 003-FR-001
System MUST give each fax or scanned batch a tracking ID, receipt timestamp (for mail, the mailroom's date-received stamp) and page count.

#### Scenario: 003-FR-001-review
- GIVEN a synthetic fax with three pages
- WHEN intake receives it
- THEN a tracking ID, original receipt timestamp and page count are recorded

### Requirement: 003-FR-002
System MUST split multi-document faxes before classification; a person confirms uncertain splits.

#### Scenario: 003-US1-AS3
- GIVEN a fax holding an appeal and a medical record
- WHEN it arrives
- THEN it is split into two documents, and a person confirms any uncertain split.

### Requirement: 003-FR-003
System MUST classify each document as a claim form, medical record, prior-authorization request, appeal or grievance, provider correspondence, or Other, with a confidence score.

#### Scenario: 003-FR-003-review
- GIVEN a readable synthetic document
- WHEN classification completes
- THEN one of the six controlled types and its confidence score are recorded

### Requirement: 003-FR-004
System MUST auto-route only non-Other documents at or above their type's threshold; the rest go to human review with a reason.

#### Scenario: 003-US1-AS1
- GIVEN claim forms classified at 0.96 and 0.72 against a 0.90 threshold
- WHEN routing runs
- THEN the first reaches the claims queue untouched; the second goes to human review.

#### Scenario: 003-US1-AS2
- GIVEN fax FAX-20261118-0042 with blank or unreadable pages
- WHEN it is classified
- THEN it goes to human review marked "unreadable".

### Requirement: 003-FR-005
System MUST let Operations set each type's threshold (0.90 at launch) and record every change.

#### Scenario: 003-FR-005-review
- GIVEN the Operations owner changing a type threshold
- WHEN the change is saved
- THEN the new threshold and its change history are recorded

### Requirement: 003-FR-006
System MUST pause a type's auto-routing when its misroute rate exceeds 2% over a rolling week and alert the product owner; only a person resumes it.

#### Scenario: 003-US5-AS2
- GIVEN provider correspondence misrouted at 2.4% over the past week
- WHEN the rate is calculated
- THEN its auto-routing pauses and the product owner is alerted.

### Requirement: 003-FR-007
System MUST extract member ID, name, date of birth, claim number and provider identifiers, with confidence scores.

#### Scenario: 003-FR-007-review
- GIVEN a synthetic document carrying member and provider identifiers
- WHEN extraction completes
- THEN each extracted identifier has a confidence score

### Requirement: 003-FR-008
System MUST attach automatically only on an exact member-ID match plus a matching date of birth or claim number; otherwise a reviewer sees candidate matches.

#### Scenario: 003-US2-AS1
- GIVEN a document showing member ID CHP-0004417 and that member's claim CLM-2026-000183
- WHEN matching runs
- THEN the document is attached to both.

#### Scenario: 003-US2-AS2
- GIVEN an exact member-ID match, a different date of birth and no claim number
- WHEN matching runs
- THEN a reviewer sees candidate matches with only the details needed to confirm one.

### Requirement: 003-FR-009
System MUST hold, unattached, any document whose identifiers point to different members, for privacy-trained reviewers only.

#### Scenario: 003-US2-AS3
- GIVEN a document showing member ID CHP-0004417 and another member's claim
- WHEN matching runs
- THEN the document goes on privacy hold, unattached, for a privacy-trained reviewer.

### Requirement: 003-FR-010
System MUST still attach documents for members whose coverage has ended, flagged "coverage ended".

#### Scenario: 003-US2-AS4
- GIVEN an exact match for a member whose coverage has ended
- WHEN matching runs
- THEN it is still attached, flagged "coverage ended".

### Requirement: 003-FR-011
System MUST pause automatic attachment and open a Privacy Office incident review whenever a wrong-member attachment is found.

#### Scenario: 003-FR-011-review
- GIVEN a wrong-member attachment is discovered
- WHEN the incident is reported
- THEN automatic attachment pauses and a Privacy Office incident review opens

### Requirement: 003-FR-012
System MUST show reviewers only the document, suggestions and member details needed to confirm a match, and let them confirm, correct with a reason code, or escalate.

#### Scenario: 003-US3-AS2
- GIVEN a reviewer who cannot decide
- WHEN they escalate
- THEN the task moves to the supervisor queue and any clock keeps running.

### Requirement: 003-FR-013
System MUST keep corrections as labeled examples inside production, used only under Privacy Office procedures; evaluation elsewhere uses only synthetic or de-identified documents.

#### Scenario: 003-US3-AS1
- GIVEN a task suggesting "medical record" at 0.71
- WHEN the reviewer changes it to "appeal or grievance" with a reason code
- THEN it routes to the appeals and grievances queue, clocked from receipt, and the correction becomes a labeled example.

### Requirement: 003-FR-014
System MUST start a deadline clock at receipt, including nights, weekends and holidays, for every confirmed or suggested prior-authorization request, appeal or grievance.

#### Scenario: 003-FR-014-review
- GIVEN a suggested appeal received outside business hours
- WHEN a reviewer confirms its classification later
- THEN its clock still starts at the original receipt time

### Requirement: 003-FR-015
System MUST flag expedited documents and put them first; uncertain ones count as expedited until a person decides.

#### Scenario: 003-US4-AS1
- GIVEN an expedited prior-authorization request received at 9:05 a.m.
- WHEN it is routed at 9:20 a.m.
- THEN it tops the utilization-management queue, flagged, clocked from 9:05 a.m.

### Requirement: 003-FR-016
System MUST alert the supervisor when half a window passes unassigned, and the on-call queue when expedited documents arrive outside business hours.

#### Scenario: 003-US4-AS2
- GIVEN an unassigned expedited appeal
- WHEN half its window has passed
- THEN the queue supervisor is alerted.

#### Scenario: 003-US4-AS3
- GIVEN an expedited appeal received at 11:40 p.m. on a Saturday
- WHEN it is classified
- THEN its clock starts at 11:40 p.m. and the on-call queue is notified.

### Requirement: 003-FR-017
System MUST report the User Story 5 measures daily by type, without member identifiers or document content.

#### Scenario: 003-US5-AS1
- GIVEN yesterday's documents
- WHEN the intake report opens
- THEN it shows by type the volume, auto-route, human-review and misroute rates, time to queue, deadline-risk items and unreconciled pages, without member identifiers.

### Requirement: 003-FR-018
System MUST reconcile every received page daily and report any gap to the intake supervisor.

#### Scenario: 003-FR-018-review
- GIVEN a three-page fax with only two accounted-for pages
- WHEN daily reconciliation runs
- THEN the missing page is reported to the intake supervisor

### Requirement: 003-FR-019
System MUST audit-log every view, route, attachment and correction, by a person or the system.

#### Scenario: 003-FR-019-review
- GIVEN a reviewer correcting a synthetic document route
- WHEN the correction is saved
- THEN the actor, action and time are audit-logged

### Requirement: 003-FR-020
System MUST lose nothing during an outage, keep clocks running from receipt, and clear the backlog earliest deadline first.

#### Scenario: 003-FR-020-review
- GIVEN documents arriving during an outage
- WHEN normal processing resumes
- THEN no pages are lost and the backlog is handled earliest deadline first with receipt clocks unchanged

### Requirement: 003-FR-021
System MUST process and store documents only in environments approved for protected health information, under the existing records-retention schedule.

#### Scenario: 003-FR-021-review
- GIVEN a proposed document storage environment
- WHEN privacy reviews the design
- THEN processing and storage are limited to approved environments and the existing retention schedule

### Requirement: 003-FR-022
System MUST NOT decide any authorization, appeal, grievance or claim; people decide.

#### Scenario: 003-FR-022-review
- GIVEN a classifier suggesting a prior authorization document
- WHEN routing completes
- THEN no authorization, appeal, grievance or claim decision is made by the classifier
