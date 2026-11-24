@003
Feature: Safe document triage
  @003-US1-AS1 @003-FR-004
  Scenario Outline: Confidence determines who routes a claim form
    Given a synthetic claim form classified at <confidence>
    When document triage runs
    Then the document queue is "<queue>"

    Examples:
      | confidence | queue        |
      | 0.96       | claim-form   |
      | 0.90       | claim-form   |
      | 0.72       | human-review |

  @003-US2-AS3 @003-FR-009
  Scenario: Conflicting identifiers prevent attachment
    Given a synthetic claim form classified at 0.96
    And the identifiers point to different members
    When document triage runs
    Then the document queue is "privacy-hold"
    And the document remains unattached

  @003-US5-AS2 @003-FR-006
  Scenario: Excess misroutes pause automatic routing
    Given a synthetic claim form classified at 0.96
    And its weekly misroute rate is 0.024
    When document triage runs
    Then the document queue is "human-review"
    And automatic routing is paused

  @003-US4-AS3 @003-FR-014
  Scenario: An expedited weekend appeal keeps its original clock
    Given an expedited appeal received at "2026-11-21T23:40:00Z"
    When document triage runs
    Then its deadline clock starts at "2026-11-21T23:40:00Z"
