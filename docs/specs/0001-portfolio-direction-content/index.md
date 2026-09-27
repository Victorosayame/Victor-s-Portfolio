# 0001. Portfolio direction and content model

**Date**: 2026-09-17
**Status**: In Progress

## Summary

This spec chooses the first content direction for Bishop's new portfolio. The site should lead with Bishop as the remembered name, serve recruiters first, and guide visitors to view work before resume or contact. Content should live as typed static content in the repo for the first build, which keeps the portfolio simple and easy to polish.

## Requirements

**User stories**:
* As a recruiter, I want to understand who Bishop is quickly so that I can decide whether to review his work.
* As a recruiter, I want to see selected projects with clear role and impact so that I can judge fit without digging.
* As Bishop, I want the older macOS portfolio included only as a past work link so that the new site stays its own direction.
* As Bishop, I want resume and contact actions defined clearly so that implementation can wire them without inventing content rules.

**Acceptance criteria**:
* **AC-1**: The portfolio content plan introduces the public identity as Bishop first, with Victor Osayame present for formal clarity.
* **AC-2**: The portfolio optimizes first for recruiters, with projects, skills, resume access, and contact paths prioritized over broad personal storytelling.
* **AC-3**: The primary call to action is View work, with resume and contact as secondary actions.
* **AC-4**: The content model supports three main featured projects, each with title, summary, role, stack, outcome, links, and featured status.
* **AC-5**: The older macOS portfolio is modeled as a fourth prior work entry, never as a visual direction for the new site.
* **AC-6**: The resume can be represented as both a view action and a download action, even if the final PDF asset is added later.
* **AC-7**: Missing optional assets, such as a project image, live link, repository link, or resume PDF, have explicit fallback behavior.

## Decision

**Chosen option**: Option 1: Typed static content in the repo

Use typed static content for the first build. The first content shape should include profile, navigation actions, featured projects, resume asset metadata, social links, and contact links.

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

## Feature design

**Data model sketch**:

| Entity | Required fields | Optional fields | Notes |
|---|---|---|---|
| `PortfolioProfile` | `preferredName`, `fullName`, `headline`, `shortBio`, `location`, `primaryAudience` | `availability`, `portraitAsset` | `preferredName` is Bishop. `fullName` is Victor Osayame. |
| `PortfolioAction` | `label`, `href`, `kind`, `priority` | `download`, `external` | `kind` values are `viewWork`, `resume`, `contact`, `external`. |
| `FeaturedProject` | `title`, `summary`, `role`, `stack`, `outcome`, `featured`, `category` | `imageAsset`, `liveUrl`, `repoUrl`, `caseStudyUrl`, `year`, `tags` | Three main featured projects use `category` value `featured`. The old macOS portfolio uses `category` value `priorWork`. |
| `ResumeAsset` | `label`, `viewHref`, `downloadHref`, `status` | `fileName`, `updatedAt` | `status` values are `ready` and `pendingAsset`. |
| `ContactLink` | `label`, `href`, `kind` | `external` | `kind` values are `email`, `github`, `linkedin`, `x`, `other`. |
| `SkillGroup` | `label`, `items` | `summary` | Groups skills for recruiter scanning. |

Unique constraints:
* Only one `PortfolioAction` should have `kind` set to `viewWork` and `priority` set to `primary`.
* Project titles should be unique in the content list.
* `ResumeAsset.status` is `pendingAsset` until a real PDF or hosted resume URL exists.
* Required launch content is Bishop's headline, short bio, location, skill groups, email, GitHub URL, LinkedIn URL, three main project details, the older macOS portfolio URL, and the resume PDF or hosted resume URL.

**API surface**:

No server endpoint is required for this feature. The interface is a local typed content export.

| Interface | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `getPortfolioContent()` | local function | none | profile, actions, projects, resume, contact links, skill groups | public | build error when required content is missing |

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Render hero identity | Bishop and Victor Osayame | `PortfolioProfile.preferredName` and `PortfolioProfile.fullName` |
| Render hero message | headline and short bio | `PortfolioProfile.headline` and `PortfolioProfile.shortBio` |
| Render primary action | View work CTA | `PortfolioAction` where `kind` is `viewWork` and `priority` is `primary` |
| Render work list | featured project cards | `FeaturedProject[]` filtered by `featured` |
| Render old portfolio link | older macOS portfolio as fourth prior work entry | `FeaturedProject` where `category` is `priorWork`, plus its `liveUrl` or `caseStudyUrl` |
| Render resume actions | view and download links | `ResumeAsset.viewHref`, `ResumeAsset.downloadHref`, and `ResumeAsset.status` |
| Render contact actions | contact and social links | `ContactLink[]` |
| Handle missing project image | fallback visual or text treatment | `FeaturedProject.imageAsset` nullable state |
| Handle missing project links | omit missing live, repo, or case study actions | nullable `FeaturedProject.liveUrl`, `repoUrl`, and `caseStudyUrl` |
| Handle missing resume asset | show polished Resume coming soon copy and keep contact available | `ResumeAsset.status` |

**Key invariants**:

* The new portfolio must not reuse the old macOS visual concept as its design direction.
* Bishop is the primary public name. Victor Osayame remains present for formal clarity.
* View work is the primary action. Resume and contact are secondary actions.
* The project set is three main featured projects plus the old macOS portfolio as a fourth prior work entry.
* A project can be featured without an image, but it cannot be featured without title, summary, role, and outcome.
* Missing optional project links are omitted from rendered actions. The project card remains valid when required fields exist.
* Resume links must not point to a broken file. If the asset is not ready, the UI shows polished Resume coming soon copy and keeps contact available.

**Security model**:

All portfolio content is public. There is no authenticated write path and no private user data in this feature. Contact links should avoid exposing secrets or private tokens.

**Critical test scenarios**:
* Happy path: content renders Bishop first, shows three main featured projects, shows the old macOS portfolio as prior work, and exposes resume and contact actions, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, and **AC-6**.
* Failure case: a missing optional image, project link, or pending resume asset does not break rendering, verifies **AC-7**.
* Content rule: the older macOS portfolio appears only as prior work and does not drive the new visual direction, verifies **AC-5**.

## Build plan

- [x] Create the typed portfolio content model and initial content object with Bishop first identity, recruiter first audience, primary View work action, secondary resume and contact actions, satisfies **AC-1**, **AC-2**, and **AC-3**.
- [x] Add featured project content support for three main projects, including role, stack, outcome, links, and featured status, satisfies **AC-4**.
- [x] Add the older macOS portfolio as a fourth prior work entry with its own link fields and no influence on the new visual direction, satisfies **AC-5**.
- [x] Add resume asset metadata with view, download, and explicit Resume coming soon pending behavior, satisfies **AC-6** and **AC-7**.
- [x] Add fallback rules that omit missing optional project links and use polished image fallbacks so later UI work has stable content states, satisfies **AC-7**.
- [x] Expose the content through a small local function or exported object for later visitor journey builds, satisfies **AC-1** through **AC-7**.

## Consequences

**Positive**:
* The first build stays simple and fast.
* The content structure is clear before visual design begins.
* Later page work can focus on layout and polish instead of inventing content rules.

**Negative / tradeoffs**:
* Bishop edits content in code for now.
* Longer case studies or blog content will need a later Markdown or CMS decision.
* The first build needs draft placeholders or pending behavior until real project links, images, contact links, and resume assets are provided.

**Neutral**:
* The portfolio can still migrate to Markdown or a CMS later because the content fields are explicit.

## Follow-up

* [ ] Provide the live URL for the older macOS portfolio if it should appear as prior work.
* [ ] Provide the final resume PDF or hosted resume URL before launch.
* [ ] Provide the three featured projects, including title, role, stack, outcome, and links.
* [ ] Provide Bishop's launch headline, short bio, location, and skill groups.
* [ ] Provide Bishop's email, GitHub URL, and LinkedIn URL.
