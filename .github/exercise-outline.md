# Exercise outline: Trace the Loop: From Intent to Evidence

## Logistics

- **Exercise title:** Trace the Loop: From Intent to Evidence
- **Repository name candidates:** `spec-driven-trace-the-loop`, `trace-intent-to-evidence`, `spec-driven-loop-trace`
- **Recommended repository name:** `spec-driven-trace-the-loop` — the shared `spec-driven-` prefix groups the
  four workshop exercises, and "trace the loop" names the skill.
- **Learner copy name:** `skills-spec-driven-trace-the-loop`
- **Experience level:** Beginner
- **Target owner:** samueltauil (assumed; confirm at publish)
- **Copyright holder:** acworkma (matches the MIT license of the source material)
- **Series:** Spec-Driven Delivery workshop, exercise 1 of 4. Next: Find the Missing Rules Before You Build.
- **Environment:** GitHub Codespaces (Node.js 22, Cucumber.js and the OpenSpec CLI preinstalled), Copilot Chat
- **exercise-toolkit version:** v0.9.3

## Learner

- **Persona:** A member of a mixed-role delivery team (product owner, business analyst, tester, developer or
  architect) at a fictional health plan, Contoso. Uses GitHub for issues and pull requests every week.
- **Can already:** Create a branch, commit, push and open a pull request; read Markdown.
- **New to:** Specification-driven delivery: how intent, OpenSpec requirements, Gherkin scenarios, code and test
  evidence link through shared IDs.
- **Likely misconceptions:** "Green tests mean the requirement is done." "The Gherkin file is the
  specification." "Copilot can confirm a system capability exists."
- **Motivation:** Their team is adopting a spec-first way of working and they need to read and challenge the
  artifacts in planning.
- **Constraints:** About 35 minutes; may not write code; personal account with Codespaces free allowance.
- **Access needs to design for:** Keyboard-only use of the codespace, screen readers (no information in images
  only), non-native English readers (short sentences).

## Objective and evidence

**Exercise objective:** Trace an approved behavior from its intent to its requirement, Gherkin scenario, code and
passing evidence, and name what that evidence does not prove.

| Step | Objective (observable) | Activity that performs it | Evidence afterwards | Automated check (what it proves) | Not proven by the check | Feedback if it fails |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Follow a worked trace for one scenario and record it | Open the codespace, read the four artifacts, run the tagged scenario, fill Trace 1, push | `trace/document-triage.md` on `trace-triage` with Trace 1 | File exists on the branch; contains `003-FR-004`; contains `passed` | That the learner understood the chain | Push to the `trace-triage` branch; paste the requirement ID and the test summary line |
| 2 | Trace a second scenario independently and state its evidence boundary | Locate `003-US4-AS3` in spec, feature and code; run it; compare THEN lines | Trace 2 filled | Contains `003-US4-AS3`; Trace 2 "Not proven" names the on-call notification | That the learner can do it without hints | Compare the spec's THEN line with the Gherkin Then line |
| 3 | Find a scenario with no automated evidence and an unconfirmed capability; open a pull request | Ask Copilot to compare IDs; record the gap; open a pull request | Gaps section filled; pull request open | Gaps names a spec scenario ID that has no automated evidence; capability and confirmer lines are filled | Whether the chosen capability is the most important one | Pick an ID that does not appear in the feature or test files; name a role who could confirm |

## Story

You just joined the Contoso Health Plan delivery team that is building inbound document triage: faxes and scans
must reach the right queue fast, attach to a member only when certain, and go to people whenever the system is
unsure. The change already has an intent brief, an OpenSpec change, Gherkin scenarios, code and tests. Before the
next planning session, your lead asks you to show how one behavior travels from intent to evidence, and where the
evidence stops.

## README

- **One-line description:** Follow one business rule from intent to passing evidence, and learn what green tests
  do not prove.
- **Who is this for:** Product owners, analysts, testers, developers and architects new to spec-driven delivery.
- **What you'll learn:** How intent, OpenSpec requirements, Gherkin scenarios, code and tests link through shared
  IDs, and how to spot an evidence gap.
- **What you'll build:** A trace worksheet for two scenarios and a recorded gap, in a pull request.
- **Prerequisites:** Comfort with branches, commits and pull requests
  ([Introduction to GitHub](https://github.com/skills/introduction-to-github)); GitHub Codespaces; Copilot Chat
  (Copilot Free is enough).
- **How long:** Less than 40 minutes.
- **In this exercise, you will:** (1) follow a worked trace for the confidence threshold, (2) trace the weekend
  appeal clock yourself and find its evidence boundary, (3) record a gap and an unconfirmed capability in a pull
  request.

## Support curve and learning moves

| Step | Support level | Retrieval or generation moment | Prediction or reflection prompt |
| --- | --- | --- | --- |
| 1 | Worked example: exact instructions and text to paste, quick win | none (first exposure) | Before running: "How many examples will run?" |
| 2 | Completion: locations named, learner finds values | Recall the four hops from step 1 without the list | Predict which part of the spec's THEN line the test checks |
| 3 | Independent: goal plus hints, Copilot as a search aid | Generate a gap and a confirmer role | "Would this gap block Ready to build?" |

## Steps

### Step 1 - Follow one behavior from intent to evidence

- **Question this step answers:** How does one sentence of intent become a requirement, a scenario, code and a
  passing check?
- **Estimated learner time:** 15 minutes (including codespace start).

**📖 Theory:** The spec-driven loop: intent (brief or issue) explains why; an OpenSpec change holds the proposal,
requirements (MUST/SHALL) and their scenarios; a Gherkin feature shows externally observable acceptance behavior;
code and tests produce evidence. Shared IDs such as `003-FR-004` (a requirement) and `003-US1-AS1` (an acceptance
scenario) link the artifacts. Humans decide at gates; AI drafts.

**References:** [OpenSpec](https://github.com/Fission-AI/OpenSpec),
[Gherkin reference](https://cucumber.io/docs/gherkin/reference/),
[Codespaces overview](https://docs.github.com/codespaces/overview).

**⌨️ Activity 1:** Open your codespace (Open in Codespaces badge → Create codespace → wait for `npm ci`).

**⌨️ Activity 2:** Follow the trace: brief → spec (`003-FR-004` / `003-US1-AS1`) → feature (Scenario Outline with
three examples) → `src/document-triage.js` (`confidence < threshold`).

**⌨️ Activity 3:** Run `npm run test:bdd -- --tags @003-US1-AS1`, see `3 scenarios (3 passed)`, paste the provided
Trace 1 block, commit and push to `trace-triage`.

**Having trouble?** Codespace targets the original repository → use the badge from the issue; push rejected (no
upstream) → `git push -u origin trace-triage`; Mona silent → check branch name and that the file changed.

**Transition**

- **Actions trigger:** `push` to branch `trace-triage` with `paths: trace/document-triage.md`.
- **Copy-time safety:** The copy push targets `main` only; `trace-triage` does not exist in the template.
- **Grading checks:** file-exists `trace/document-triage.md`; keyphrase `003-FR-004`; keyphrase `passed`.
- **Failure feedback:** rows "Your trace file is on the `trace-triage` branch", "Trace 1 names requirement
  `003-FR-004`", "Trace 1 records the passing test summary"; tips: paste the Trace 1 block, push again.
- **Learner artifact:** Trace 1 on `trace-triage`.

### Step 2 - Find where the evidence stops

- **Question this step answers:** What does a passing scenario actually prove?
- **Estimated learner time:** 10 minutes.

**📖 Theory:** A passing scenario proves only what its `Then` steps assert. The spec's THEN line can promise more
than the Gherkin `Then` checks, and the feature's requirement tag shows which rule the example demonstrates. Record
the unproven part rather than editing tags or scenarios to look complete.

**⌨️ Activity:** Trace `003-US4-AS3` (expedited weekend appeal): find its requirement in the spec (under
`003-FR-016`), its feature tag (`@003-FR-014`), the code (`clockStartsAt`), run
`npm run test:bdd -- --tags @003-US4-AS3`, compare THEN lines and fill Trace 2, then push.

**Transition**

- **Actions trigger:** same as step 1 (`push` to `trace-triage`, `paths: trace/document-triage.md`).
- **Copy-time safety:** as step 1.
- **Grading checks:** keyphrase `003-US4-AS3`; regex `on-?call|notif` inside the Trace 2 section (github-script).
- **Failure feedback:** rows "Trace 2 follows scenario `003-US4-AS3`", "Trace 2 names the part of the scenario the
  test does not check"; tip: compare the spec's THEN line with the Gherkin Then line.
- **Learner artifact:** Trace 2 on `trace-triage`.

### Step 3 - Record a gap and open a pull request

- **Question this step answers:** What is still unproven or unconfirmed before anyone calls this ready?
- **Estimated learner time:** 10 minutes.

**📖 Theory:** A spec can preserve scenarios that no automated check covers yet, and every spec rests on
assumed capabilities (a field, lookup, API or queue). Copilot can help find candidates, but only a named person
can confirm a capability; until then it blocks the Ready to build gate.

**⌨️ Activity 1:** Ask Copilot (read-only prompt) to list spec scenario IDs that do not appear in the feature or
test files; verify one yourself; fill the Gaps section, including an unconfirmed capability and who could confirm it.

**⌨️ Activity 2:** Commit, push, open a pull request from `trace-triage` into `main`.

**Transition**

- **Actions trigger:** `pull_request` to `main`, types `opened`, `synchronize`, `reopened`.
- **Copy-time safety:** not a push event.
- **Grading checks (github-script on the Gaps section):** a scenario ID matching
  `003-(US\d+-AS\d+|FR-\d{3}-review)` that is not one of the automated IDs (`003-US1-AS1`, `003-US2-AS1`,
  `003-US2-AS2`, `003-US2-AS3`, `003-US4-AS3`, `003-US5-AS2`); the capability line has at least 10 characters;
  the confirmer line is filled.
- **Failure feedback:** rows for each; tips: choose an ID absent from the feature and test files; name a role.
- **Learner artifact:** pull request with the completed trace.

## Review

- **Recap:** You can trace a behavior across artifacts by ID; state an evidence boundary; record a gap and an
  unconfirmed capability with an owner.
- **Recall questions:** Why can a green scenario leave a requirement unproven? `003-US4-AS3` sits under
  `003-FR-016` in the spec but is tagged `003-FR-014` in Gherkin: what does that tell you, and what should you do?
- **Transfer prompt:** Pick one acceptance criterion in your backlog; name the check that proves it and one thing
  it does not prove.
- **What's next:** Exercise 2, Find the Missing Rules Before You Build.

## File map

| File | Purpose |
| --- | --- |
| `.github/exercise-outline.md` | This approved outline |
| `README.md` | Landing page with the Copy Exercise button |
| `LICENSE` | MIT |
| `.github/steps/1-step.md` … `3-step.md`, `x-review.md` | Step content and review |
| `.github/workflows/0-start-exercise.yml` | Starts the exercise, posts step 1 |
| `.github/workflows/1-step.yml`, `2-step.yml` | Graded push to `trace-triage` |
| `.github/workflows/3-step.yml` | Final, graded pull request |
| `.github/copilot-instructions.md` | Spec-driven rules for Copilot |
| `.devcontainer/devcontainer.json` | Node.js 22, `npm ci`, Copilot Chat, Cucumber extension |
| `intent/document-triage-brief.md` | Intent brief |
| `openspec/changes/add-inbound-document-triage/**` | Proposal, design, tasks, spec delta |
| `features/document-triage.feature`, `features/step-definitions/document-triage.steps.js` | Gherkin and step definitions |
| `src/document-triage.js`, `src/dates.js`, `tests/document-triage.test.js` | Code and unit evidence |
| `trace/document-triage.md` | Learner worksheet |
| `package.json`, `package-lock.json` | Pinned Cucumber.js and OpenSpec |

## Test plan

- **Walkthrough personas:** literal novice (product owner, never used a terminal), experienced skimmer (developer).
- **Negative tests:** step 1 push without the requirement ID; step 2 "Not proven" left blank; step 3 naming an
  automated ID (`003-US1-AS1`).
- **Environments to test:** personal account, Codespaces free allowance, Copilot Free.

## Risks and open questions

- Codespace creation time (2 to 4 minutes) eats into a short step 1; mitigated by starting during the welcome.
- Learners may open the codespace on the template instead of their copy; the badge uses `{{ full_repo_name }}`.

## Future considerations

- A variant using Copilot CLI in the terminal instead of Copilot Chat.
