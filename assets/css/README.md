# CSS architecture

The root-level CSS files are compatibility entrypoints kept so the current HTML
does not need to change.

- `site.css`: shared site styles and home-page styles currently used by the main
  website pages.
- `pages/`: page-specific styles for institutional, lawyer, practice-area,
  article, and legal pages.
- `landing-pages/`: styles for standalone landing pages.
- `legacy/`: preserved previous-version styles.

When editing styles, prefer changing the files in this folder and keep the
entrypoint files as small `@import` wrappers.
