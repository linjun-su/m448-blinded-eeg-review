# M448 EEG alarm self-check

This directory is the complete GitHub Pages site for the causal EEG alarm self-check.

Open `index.html` through the published Pages URL. The page is self-contained and requires no server, installation, or login. It provides five 18-channel EEG cases, causal pre-alarm navigation, display controls, and one binary `True alarm` / `False alarm` question.

After a choice, the page immediately reports whether it is correct and displays the frozen benchmark answer. The website does not upload or centrally collect responses.

## Data scope

- No patient identifiers, run identifiers, seizure onset times, lead times, or unblinding key are included.
- The binary alarm outcomes are embedded solely to provide immediate feedback; this is a self-check page, not an independent blinded-rating instrument.
- Only pre-alarm EEG is available; navigation cannot move past the alarm.
- The embedded EEG is from the public, de-identified CHB-MIT Scalp EEG Database.
- The unblinded review key and research outputs must remain outside this Pages directory.

## Deployment

Publish the contents of this directory at the root of a `gh-pages` branch. The `.nojekyll` marker ensures GitHub Pages serves the site as static files.

## Frozen artifact

- Entry point: `index.html`
- SHA-256: `6479edb25b299e1469f1c3cdf06e8cf52e8e6777309ef378fadfa1e8c4c167e5`
- Frozen: 2026-08-12
