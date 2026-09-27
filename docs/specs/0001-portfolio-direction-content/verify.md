# Verify: portfolio direction and content model, spec 0001, updated 2026-09-18

_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these, and `/test` locks the durable ones._

## Commands

- [ ] `npm.cmd run lint` passes, covers **AC-1** through **AC-7**.
- [ ] `npm.cmd run build` passes, covers **AC-1** through **AC-7**.

## Code checks

- [ ] Import `getPortfolioContent()` and confirm `profile.preferredName` is `Bishop`, `profile.fullName` is `Victor Osayame`, and `profile.primaryAudience` is `recruiters`, covers **AC-1** and **AC-2**.
- [ ] Import `getPrimaryAction()` and confirm it returns the `View work` action with `kind` set to `viewWork` and `priority` set to `primary`, covers **AC-3**.
- [ ] Import `getFeaturedProjects()` and confirm it returns exactly three projects where `category` is `featured` and `featured` is `true`, covers **AC-4**.
- [ ] Import `getPriorWork()` and confirm it includes the macOS portfolio only as `category` value `priorWork`, covers **AC-5**.
- [ ] Inspect the resume object and confirm `status` is `pendingAsset`, `viewHref` is `null`, `downloadHref` is `null`, and a pending message is present, covers **AC-6** and **AC-7**.
- [ ] Call `getReadyProjectLinks()` on a project without optional URLs and confirm it returns no dead actions, covers **AC-7**.
- [ ] Call `getReadyContactLinks()` and `getPendingContactLinks()` and confirm pending email, GitHub, and LinkedIn links are not treated as ready URLs, covers **AC-7**.

## Acceptance criteria coverage

- **AC-1**: covered by profile identity code check and build.
- **AC-2**: covered by primary audience code check and build.
- **AC-3**: covered by primary action code check.
- **AC-4**: covered by featured project count and category code check.
- **AC-5**: covered by prior work code check.
- **AC-6**: covered by resume pending asset code check.
- **AC-7**: covered by missing link, pending resume, and pending contact code checks.
