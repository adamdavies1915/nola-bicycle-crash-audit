# New Orleans Bicycle Crash Audit

Static GitHub Pages site for the Broad Street and US 90 corridor analysis prepared November 10, 2026. Open `index.html` or serve this directory with a static web server. No build step or secrets required.

The map reports 53 and 19 corridor memberships, with 69 distinct crash records after shared-endpoint deduplication. Read [methodology](REPORT.md) for geographic definitions, different source filters, and limitations. The 2026 period is partial.

Historical record IDs link to the official city ArcGIS API. Newer record viewers request the selected ID from the city public Power BI API on each visit, show the retrieval time, and never silently substitute a saved snapshot when the network fails.

Sources: City of New Orleans crash services and dashboard. Street geometry © OpenStreetMap contributors, ODbL. This is an independent analysis, not an official city website or the full police crash reports.
