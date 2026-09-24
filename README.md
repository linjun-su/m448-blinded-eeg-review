# EEG expert review — M678

This replaces the active M450 self-check with outcome-masked review of every
emitted alarm from frozen M677 strict short15, plus a separate source-anomaly
gallery. Outcome keys and source mappings are not deployed. Old NAS artifacts
and the previous deployment commit are retained; there is no history rewrite.

The full model replay includes 23 patient groups and 135 targets; the website
is a collection of short alarm excerpts, not all 135 targets or all recorded EEG.
It includes protected/unscored alarms as well as formally scored alarms. No
clinical outcome can be inferred just from inclusion in this set.

Native 256 Hz, unfiltered calibrated microvolts, little-endian channel-major
float32 gzip assets. No gap filling. PRE 60 seconds, POST 20 seconds, anomaly
context 120 seconds before / 60 after. Assets are verified by SHA256 in browser.
Visible-window constant centering is optional; the common physical scale is
explicit. No independently normalized lead amplitudes or invented waveforms.

POST requires a saved PRE opinion in the interface. This is not a secure access
control: static POST assets can be retrieved directly. The anomaly gallery is
outcome-exposed/retrospectively selected and can compromise later blind opinions;
the browser records gallery exposure in exported notes. This is not independent
validation, a diagnosis service, or an alarm-veto validation.

Notes stay in versioned localStorage. Export JSON and send to the study owner;
the site does not collect responses centrally. Import merges saved notes. Do not
enter identifying information. Export before clearing browser data.

Data attribution: Guttag, J. (2010), CHB-MIT Scalp EEG Database v1.0.0, PhysioNet,
https://doi.org/10.13026/C2K01R. Public derived excerpts under Open Data Commons
Attribution License v1.0: https://opendatacommons.org/licenses/by/1-0/.
See also Ali Shoeb, MIT PhD thesis (2009). Source dataset:
https://physionet.org/content/chbmit/1.0.0/.

Only this public directory belongs on gh-pages. Never publish the parent folder,
PRIVATE_KEY.json, source audit, raw EDF headers, research caches or models.
