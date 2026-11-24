# Proposal: Inbound document triage

## Why

Contoso Health Plan's intake staff hand-sort a high volume of faxed and scanned documents. Misroutes cause rework,
and delays risk missed deadlines. See the [intent brief](../../../intent/document-triage-brief.md).

## What Changes

- Add the inbound-document-triage capability: classification, confidence routing, safe attachment, privacy holds,
  deadline clocks, misroute pauses and reporting.
- Deliver a first slice: deterministic routing of supplied classification results, exact-match attachment,
  privacy holds, pause decisions and receipt clocks, with unit tests and Gherkin scenarios.

## Not in the first slice

Reading documents (OCR or classification models), attaching real files, a persistent pause store, reviewer
authorization, reports and alert delivery. The specification describes the full business intent; the first slice
does not implement every rule.

## Approval

Practice proposal with fictional data. It records no real product or engineering approval.
