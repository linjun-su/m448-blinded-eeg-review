# M448 EEG alarm self-check

This directory is the complete GitHub Pages site for the causal EEG alarm self-check.

Open `index.html` through the published Pages URL. The site requires no server, installation, or login. It contains the 257 independently scored M448 alarms, each with 15 minutes before and 15 minutes after the alarm in actual 18-channel EEG. EEG is stored as one losslessly compressed asset per case, so the browser downloads only the case currently being reviewed. The post-alarm half remains locked until the reviewer chooses an answer.

After a choice, the page immediately reports whether it is correct and displays the frozen benchmark answer. It also unlocks links to the official PhysioNet LightWAVE viewer for every source EDF needed to inspect up to 65 minutes after the alarm. A retained five-case deep viewer is available at `five-case-deep-review.html`; it embeds 10 minutes before and 15 minutes after those five alarms. The website does not upload or centrally collect responses.

## Data scope

- The page includes 63 one-to-one matched true alarms and 194 formal operational false alarms.
- The 26 protocol-excluded/protected or duplicate-opportunity alarms remain in the internal audit ledger but are intentionally omitted from this binary review page.
- Patient and run identifiers are hidden in the interface. De-identified public source-record links are embedded solely for post-answer LightWAVE review.
- Alarm outcomes are embedded solely to provide immediate feedback; this is a self-check page, not an independent blinded-rating instrument.
- Before a choice, the reviewer can scroll freely through the 15 minutes ending at the alarm. Post-alarm EEG, clinical onset, lead time, and source-record links remain hidden.
- After feedback, 15 minutes of embedded post-alarm EEG, the benchmark, lead time for true alarms, and source links for up to 65 minutes of review are revealed.
- The embedded EEG is from the public, de-identified CHB-MIT Scalp EEG Database.
- The unblinded review key and research outputs must remain outside this Pages directory.

## Deployment

Publish the contents of this directory at the root of a `gh-pages` branch. The `.nojekyll` marker ensures GitHub Pages serves the site as static files.

## Frozen artifact

- Entry point: `index.html`; waveform assets: `case_data/case_*.d16gz`
- Cases: 257 independently scored alarms
- Context: 15 minutes before and 15 minutes after each alarm; the latter is answer-locked
- Waveform encoding: 128 Hz, int16 physical µV, lossless time-delta plus gzip
- Entry-point SHA-256: `616f8b33373afd7a80edaa16e81e970317703ca28c17f2160fdab92ceabd268e`
- Five-case deep viewer: `five-case-deep-review.html`
- Deep-viewer SHA-256: `d2f4864741b7fb23bbaf9691e4d987414e02232fa19c00e259909c8fb324ef3a`
- Frozen: 2026-08-13
