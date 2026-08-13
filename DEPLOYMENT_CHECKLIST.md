# Deployment checklist

- [x] Single self-contained static HTML entry point
- [x] All 283 emitted alarms use shuffled case numbers only
- [x] 63 matched true, 194 formal false, and 26 not-independently-scored alarms accounted for
- [x] Patient and run identifiers hidden in the interface
- [x] Absolute seizure onset annotations excluded; relative lead appears only after choice for true alarms
- [x] Local HPC paths and credentials excluded
- [x] Actual 15-second, 18-channel EEG displayed for every alarm
- [x] `Go to alarm` navigation label used
- [x] Fifteen minutes before and after each of 257 independently scored alarms
- [x] Protocol-excluded alarms retained only in the internal audit ledger
- [x] Per-case assets loaded on demand; post-alarm EEG remains unavailable before choice
- [x] Up-to-65-minute PhysioNet LightWAVE source links revealed after choice
- [x] Immediate benchmark feedback for all three scoring categories
- [x] Five-case embedded deep viewer retained separately
- [ ] Push this directory as the root of `gh-pages`
- [ ] Verify the public URL without GitHub authentication
