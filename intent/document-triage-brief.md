# Intent brief: Inbound document triage

**Product owner**: Product owner, Operations Intake  |  **Engineering lead**: Engineering lead, Operations Platform  |  **Date**: 2026-11-18

> Product owner leads. This brief explains why the change exists. The team used its prompt to ask Copilot for a
> first OpenSpec proposal, then reviewed the draft together.

## 1. Problem and outcome

- **Problem**: Intake staff hand-sort a high volume of faxed and scanned documents, keying identifiers and routing each one. Misroutes cause rework; delays risk missed deadlines.
- **Outcome**: Right queue fast, attached only when certain, people on everything uncertain.
- **Out of scope**: replacing fax, email intake, outbound faxes, clinical review.

## 2. Spec and acceptance

- **Rules and assumptions**: The system suggests; people decide. Never guess member identity. Show reviewers only what they need. Queues and deadline policies exist.
- **Happy path**: **Given** a faxed medical record whose member ID CHP-0004417 and claim CLM-2026-000183 match our records, **When** it arrives, **Then** it reaches the right queue, attached, untouched.
- **Exception**: **Given** a fax whose member ID and claim number belong to different members, **When** it arrives, **Then** nothing is attached; a privacy-trained reviewer gets it.

## 3. Handoffs and evidence

- **Systems**: fax, mailroom scanning, member and claims records, work queues, audit log.
- **People**: intake reviewers, supervisors, privacy-trained reviewers, receiving teams, Operations, Privacy Office.
- **Dependencies**: PHI-approved environment; policy owners' deadline windows; Privacy Office sign-off.
- **Test data**: synthetic faxes like FAX-20261118-0042: multi-document, blank, handwritten, non-English, conflicting identifiers.
- **Evidence**: scenario-named tests pass; pilot misroutes stay low; every page reconciles daily.

## 4. Improvements and unknowns

- **Catch gaps earlier**: suggest-only pilot start; count downstream re-routes as misroutes.
- **Open questions**:
  1. Which document types are routed automatically?
  2. When may the system attach a document to a member without a person?
  3. What confidence threshold triggers auto-routing?
  4. When does the deadline clock start?
  5. What data may be used to evaluate and improve classification?
- **Baseline first**: receipt-to-queue time, misroute rate, keying time per document (time study), late time-sensitive items.

## Prompt for Copilot to draft an OpenSpec proposal

```text
Inbound document triage for Contoso Health Plan's intake team.
Faxed and scanned claims, medical records, prior-authorization requests, appeals, grievances and provider letters arrive daily.
Hand sorting causes misroutes, rework and missed deadlines.
Classify each document with a confidence score; auto-route confident ones, send the rest to people.
Attach to a member and claim only when certain, never when identifiers point to two members.
Time prior-authorization requests and appeals; flag expedited ones; alert at half the window.
Reviewers see only the document and suggestions; audit every action.
Report volumes, automation, misroutes, time to queue and deadline risk.
The system routes and suggests; people decide.
Out of scope: replacing fax, email intake, outbound faxes, clinical review.
```
