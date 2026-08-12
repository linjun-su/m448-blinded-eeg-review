# M448 EEG alarm self-check

This directory is the complete GitHub Pages site for the causal EEG alarm self-check.

Open `index.html` through the published Pages URL. The page is self-contained and requires no server, installation, or login. It contains all 283 emitted M448 alarms, each with its actual 15-second, 18-channel EEG window and a frozen outcome self-check.

After a choice, the page immediately reports whether it is correct and displays the frozen benchmark answer. It also unlocks links to the official PhysioNet LightWAVE viewer for every source EDF needed to inspect up to 65 minutes after the alarm. A retained five-case deep viewer is available at `five-case-deep-review.html`; it embeds 10 minutes before and 15 minutes after those five alarms. The website does not upload or centrally collect responses.

## Data scope

- The page includes 63 one-to-one matched true alarms, 194 formal operational false alarms, and 26 emitted alarms that were not independently scored because they lie in excluded/protected or duplicate-opportunity regions.
- Patient and run identifiers are hidden in the interface. De-identified public source-record links are embedded solely for post-answer LightWAVE review.
- Alarm outcomes are embedded solely to provide immediate feedback; this is a self-check page, not an independent blinded-rating instrument.
- Before a choice, only the 15 seconds ending at the alarm are shown. Source-record links are revealed only after feedback.
- The embedded EEG is from the public, de-identified CHB-MIT Scalp EEG Database.
- The unblinded review key and research outputs must remain outside this Pages directory.

## Deployment

Publish the contents of this directory at the root of a `gh-pages` branch. The `.nojekyll` marker ensures GitHub Pages serves the site as static files.

## Frozen artifact

- Entry point: `index.html`
- Cases: 283 emitted alarms
- SHA-256: `6971116a2bb446e493fc2a252a6812610d30b61655196105b6c4cc90ab52899c`
- Five-case deep viewer: `five-case-deep-review.html`
- Deep-viewer SHA-256: `04d521bc6125900dc325211bf36c310622affb2f176ee17c69d769db4a9a926c`
- Frozen: 2026-08-12
