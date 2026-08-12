# M448 blinded EEG review

This directory is the complete GitHub Pages site for the blinded clinician review.

Open `index.html` through the published Pages URL. The page is self-contained and requires no server, installation, or login. It provides five blinded 18-channel EEG cases, causal pre-alarm navigation, display controls, and a clinician rating form.

Review decisions are stored only in the reviewer's browser. Reviewers must use **Download blinded CSV** and return that file to the study team; the website does not upload or centrally collect responses.

## Blinding and data scope

- No patient identifiers, run identifiers, outcome labels, seizure onset times, or unblinding key are included.
- Only pre-alarm EEG is available; navigation cannot move past the alarm.
- The embedded EEG is from the public, de-identified CHB-MIT Scalp EEG Database.
- The unblinded review key and research outputs must remain outside this Pages directory.

## Deployment

Publish the contents of this directory at the root of a `gh-pages` branch. The `.nojekyll` marker ensures GitHub Pages serves the site as static files.

## Frozen artifact

- Entry point: `index.html`
- SHA-256: `364059a35b41502abbdd0fb75a4f7514b96615227143179d945b5282d7947f93`
- Frozen: 2026-08-12
