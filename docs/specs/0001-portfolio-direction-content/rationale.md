# Rationale: Portfolio direction and content model

## Context

Bishop is building a completely new portfolio, not a return to the older macOS style. The older portfolio should appear only as a prior work link when useful. The current app is a small Next project with starter content, no CMS, no database, and no real portfolio data yet.

The first decision needs to settle the story and content model before visual design or implementation. If this is left open, later build steps will invent names, section order, project fields, resume behavior, and calls to action in code. That would make the portfolio feel inconsistent and harder to revise.

The primary audience is recruiters. The portfolio still needs to feel polished enough for clients and peers, but the first pass should optimize for fast credibility, clear work proof, and easy screening.

## Options considered

### Option 1: Typed static content in the repo

Portfolio content is stored in a typed module or small typed data files in the app source. The UI reads that content directly at build time.

**Pros**:
* Few moving parts, which fits a personal portfolio.
* Type checks can catch missing required project fields before launch.
* Easy for `/develop` to build without adding a database or content service.

**Cons**:
* Bishop edits content through code, not through an admin UI.
* Non technical editing is not available until a later CMS decision.

### Option 2: Markdown content files

Portfolio content is stored as Markdown or MDX files, one page or project per file. The app renders those files into sections.

**Pros**:
* Good for long case studies and writing.
* Easier to expand into a blog or notes area later.

**Cons**:
* More parsing and file conventions are needed before the first page exists.
* Overkill for the first sleek portfolio if most content is short structured blocks.

### Option 3: Headless CMS

Portfolio content is managed in an external content system and fetched by the app.

**Pros**:
* Bishop could edit content without changing code.
* Useful if content updates become frequent or shared with other channels.

**Cons**:
* Adds account setup, preview behavior, failure modes, and fetch logic before the portfolio has proven it needs them.
* Makes a small personal site depend on an external service for basic content.

## Rationale

The portfolio goal is polish and clarity, not content operations. A typed static content model gives `/develop` enough structure to build confidently while keeping the system small. The runner up is Markdown content files, which would make sense once Bishop wants longer case studies or a blog.

The recruiter first direction also argues for a tight content model. Recruiters need a fast scan of identity, role, skills, proof, resume, and contact. A CMS or long Markdown setup would slow down the first useful build without improving that first impression.
