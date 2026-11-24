# Trace the Loop from Intent to Evidence

<img width="800" alt="Exercise 1 of 4 of the Spec-Driven Delivery workshop: Trace the Loop from Intent to Evidence. Follow one rule from intent to passing evidence, and find what green tests do not prove. Tools: Codespaces, GitHub Copilot, OpenSpec and Gherkin. Focus of this exercise: Intent, Requirement, Scenario, Code and Evidence." src=".github/images/banner.png">

_Follow one business rule from intent to passing evidence, and find out what green tests do not prove._

## Welcome

- **Who is this for**: Product owners, business analysts, testers, developers and architects who are new to spec-driven delivery.
- **What you'll learn**: How intent, OpenSpec requirements, Gherkin scenarios, code and tests link through shared IDs, and how to spot where the evidence stops.
- **What you'll build**: A trace worksheet for two business rules and a recorded gap, shared in a pull request.
- **Prerequisites**:
  - Comfort with branches, commits and pull requests. If they are new to you, start with [Introduction to GitHub](https://github.com/skills/introduction-to-github).
  - Access to [GitHub Codespaces](https://docs.github.com/en/codespaces/overview). Personal accounts include monthly free usage.
  - [GitHub Copilot](https://github.com/features/copilot) with Copilot Chat. Copilot Free works, but its monthly allowance is limited, and the full workshop uses many prompts.
- **How long**: This exercise takes less than 40 minutes to complete.

In this exercise, you will:

1. Follow a worked trace for a confidence-routing rule, from intent to a passing scenario.
1. Trace a weekend appeal rule on your own and name what its test does not prove.
1. Record a scenario with no automated evidence and an unconfirmed capability, then open a pull request.

This is exercise 1 of 4 in the **Spec-Driven Delivery with OpenSpec, Gherkin and GitHub Copilot** workshop. All organizations, people and data in it are fictional.

<img width="800" alt="Workshop map, Spec-driven delivery workshop: four exercises, one delivery loop. 1, Trace the loop: intent to evidence. 2, Find the missing rules: before you build. 3, Deliver a behavior: test-first, with Copilot. 4, Draft your first spec: capstone. Exercise 1 is highlighted: You are here." src=".github/images/workshop-map.png">

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=samueltauil&template_name=spec-driven-trace-the-loop&owner=%40me&name=skills-spec-driven-trace-the-loop&description=Exercise:+Trace+the+Loop+from+Intent+to+Evidence&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.

- We recommend creating a public repository, since private repositories will use Actions minutes.

If the exercise isn't ready in 20 seconds, please check the [Actions](../../actions) tab.

- Check to see if a job is running. Sometimes it simply takes a bit longer.

- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>

---

&copy; 2026 acworkma &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
