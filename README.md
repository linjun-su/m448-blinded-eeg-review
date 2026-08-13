# M448 EEG alarm self-check

This directory is the complete GitHub Pages site for the causal EEG alarm self-check.

Open `index.html` through the published Pages URL. The site requires no server, installation, or login. It contains all 283 emitted M448 alarms, each with ten minutes of actual pre-alarm, 18-channel EEG and a frozen outcome self-check. EEG is stored as one losslessly compressed asset per case, so the browser downloads only the case currently being reviewed.

After a choice, the page immediately reports whether it is correct and displays the frozen benchmark answer. It also unlocks links to the official PhysioNet LightWAVE viewer for every source EDF needed to inspect up to 65 minutes after the alarm. A retained five-case deep viewer is available at `five-case-deep-review.html`; it embeds 10 minutes before and 15 minutes after those five alarms. The website does not upload or centrally collect responses.

## Data scope

- The page includes 63 one-to-one matched true alarms, 194 formal operational false alarms, and 26 emitted alarms that were not independently scored because they lie in excluded/protected or duplicate-opportunity regions.
- Patient and run identifiers are hidden in the interface. De-identified public source-record links are embedded solely for post-answer LightWAVE review.
- Alarm outcomes are embedded solely to provide immediate feedback; this is a self-check page, not an independent blinded-rating instrument.
- Before a choice, the reviewer can scroll freely through the ten minutes ending at the alarm. Post-alarm EEG, clinical onset, lead time, and source-record links remain hidden.
- After feedback, the benchmark, lead time for true alarms, and source links for up to 65 minutes of post-alarm review are revealed.
- The embedded EEG is from the public, de-identified CHB-MIT Scalp EEG Database.
- The unblinded review key and research outputs must remain outside this Pages directory.

## Deployment

Publish the contents of this directory at the root of a `gh-pages` branch. The `.nojekyll` marker ensures GitHub Pages serves the site as static files.

## Frozen artifact

- Entry point: `index.html`; waveform assets: `case_data/case_*.d16gz`
- Cases: 283 emitted alarms
- Pre-alarm context: 10 minutes per case
- Waveform encoding: 128 Hz, int16 physical µV, lossless time-delta plus gzip
- Entry-point SHA-256: `8ac20c51d9117c906011fec4fa693203e8972f524a8d839487e8f6a6d16bac6b`
- Five-case deep viewer: `five-case-deep-review.html`
- Deep-viewer SHA-256: `d2f4864741b7fb23bbaf9691e4d987414e02232fa19c00e259909c8fb324ef3a`
- Frozen: 2026-08-12
