# Design: Inbound document triage

- **Stack:** JavaScript ES modules, `node:test` for unit tests and Cucumber.js for Gherkin scenarios.
- **Code:** [src/document-triage.js](../../../src/document-triage.js)
- **Technical evidence:** [unit tests](../../../tests/document-triage.test.js)
- **Business evidence:** [Gherkin scenarios](../../../features/document-triage.feature)

## Decisions

- The caller supplies the classification result and synthetic match flags (`memberIdMatches`,
  `claimNumberMatches` and so on). The first slice does not read documents, search member or claim records, or
  send messages.
- Returned alerts are requests for another system to deliver. They are not delivered messages.
- The caller must persist a pause until a person authorizes resumption.
- If code, scenarios and requirements disagree, record the conflict before changing any artifact.
