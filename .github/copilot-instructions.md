# Specification-driven development rules

OpenSpec is authoritative for requirements, constraints, and approved change
scope. Gherkin `.feature` files are authoritative for externally observable
acceptance behavior. A GitHub issue explains intent; it does not override an
approved requirement or security policy.

Before coding:

1. Read the linked issue, when available, and identify any missing context.
2. Read the current spec, active change, design, tasks, and related feature files.
3. Report conflicts, ambiguities, and unanswered questions.
4. Produce a plan mapping each scenario to code changes and automated tests.
5. Wait for the appropriate human approval of the requirements and plan.

During implementation:

- Do not modify specs or feature files unless the user explicitly approves the
  requirement change. Never weaken a scenario merely to make a test pass.
- Implement one bounded task at a time and run the relevant tests.
- Keep changes within the approved scope.
- If code, OpenSpec, and Gherkin conflict, stop and report the conflict. Do not
  silently choose one.
- Never introduce PHI, secrets, production identifiers, or customer data into
  prompts, fixtures, logs, or source files.
