# M450 EEG alarm self-check

This directory is the complete GitHub Pages site for the causal EEG alarm self-check. M450 applies an outer-patient-disjoint, nested-safe Hjorth-complexity ceiling to the frozen M448 alarms; it retains all 63 detected events while reducing formal false alarms from 194 to 179 (FA/h 0.21765).

Open `index.html` through the published Pages URL. The site requires no server, installation, or login. It contains the 242 independently scored M450 alarms, each with 15 minutes before and 15 minutes after the alarm in actual 18-channel EEG. EEG is stored as one losslessly compressed asset per case, so the browser downloads only the case currently being reviewed. The post-alarm half remains locked until the reviewer chooses an answer.

The mode selector provides free browsing and a balanced 30-case test. The fixed test always contains the same seeded 15 true and 15 false alarms, while every restart reshuffles their order. A second button draws a fresh balanced 15+15 sample from all 242 cases; successive samples may overlap. After every choice, the page reports the frozen benchmark answer, and the final panel gives overall/class-specific accuracy and the confusion matrix. Because the test is artificially balanced, raw accuracy is a morphology-discrimination check rather than clinical PPV.

Feedback also unlocks links to the official PhysioNet LightWAVE viewer for every source EDF needed to inspect up to 65 minutes after the alarm. Answers stay only in the current browser session; the website does not upload or centrally collect responses.

## Data scope

- The page includes 63 one-to-one matched true alarms and 179 formal operational false alarms.
- The 15 M448 false alarms rejected by M450 and the 26 protocol-excluded/protected or duplicate-opportunity alarms remain in the internal audit ledger but are intentionally omitted from this binary review page.
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
- Cases: 242 independently scored alarms, consecutively numbered 001–242
- Context: 15 minutes before and 15 minutes after each alarm; the latter is answer-locked
- Waveform encoding: 128 Hz, int16 physical µV, lossless time-delta plus gzip
- Entry-point SHA-256: `408e21bb9ba8914b386bff559f69b578368db4dfd8528c085c516c4d16dcdd87`
- Frozen: 2026-08-13
