# M677 EEG alarm self-check / M678 source-anomaly gallery

Legacy self-check layout restored at the user's request: browse all cases,
immediate answer feedback, balanced30-case tests, original page/amplitude/
polarity/timeline controls and15-minute pre/post context. This intentionally
publishes answer labels and is not strict independent blinding.

Current frozen M677 strict short15:259 emitted alarms;47 one-to-one credited,
185 formal false alarms,27 review-only. Balanced tests draw15 true and15 false
only; review-only cases are not a third clinical class. Full model evaluation
remains23 groups/135 targets, not259 targets. No retraining or new performance.

Display matches the legacy transformation: zero-phase fourth-order Butterworth
0.5–60Hz,128Hz export,rounded int16 physicalµV,delta16+gzip. This retrospective
display filter uses future samples; it is not the causal prediction input.
Missing data remain missing. Each case loads on demand; no bulk browser download.

The separate anomaly gallery preserves15 minutes each side and adds specific
source observations,questions,and native unfiltered256Hz two-second figures.
Display-filtered EEG must not be used to verify digital-zero claims. Gallery
notes are saved locally and exported manually; no automatic collection. No
identifying information should be entered. Looking at known examples compromises
later blind opinions about overlapping examples.

Data: Guttag,J.(2010),CHB-MIT Scalp EEG Database v1.0.0,PhysioNet,
https://doi.org/10.13026/C2K01R,Open Data Commons Attribution1.0:
https://opendatacommons.org/licenses/by/1-0/.
See Ali Shoeb,MIT PhD thesis(2009).
Only public deidentified CHB-MIT-derived excerpts are included. No private
clinical data,models,internal paths or source audit records are deployed.

Old active-site assets are replaced,not offered as a separate legacy page.
Original experimental results and original EEG remain on NAS; existing Git
history is not rewritten.
