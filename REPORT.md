# Bicycle-involved crash records: Broad and US 90

Queried November 10, 2026. The second corridor follows US 90 from Broad/St. Bernard via North Broad, the Allen Street / New Orleans Street one-way pair, and Gentilly Boulevard to Frenchmen Street. Both travel directions are included. This follows the user's confirmed US 90 interpretation, not Gentilly directly from its separate St. Bernard intersection.

| Corridor | 2019–2024 bicycle-involved records | Additional 2025–2026 pedalcycle-first-event records | Identified total |
|---|---:|---:|---:|
| North Broad: Lafitte Greenway → St. Bernard Avenue | 36 | 17 | **53** |
| US 90: Broad/St. Bernard → Frenchmen Street | 12 | 7 | **19** |

**These are spatial corridor counts, including intersections, not verified police-report street assignments.** Count each distinct source crash ID within 30 metres of either carriageway of the clipped corridor, including endpoint intersections. Current street geometry is the saved September 12, 2026 OpenStreetMap snapshot. Coordinates alone do not establish which street the cyclist was traveling on. The newer dashboard's first-harmful-event filter is narrower than the older Bicycle flag, so the combined numbers are identified records and potentially undercount all bicycle involvement. The 2026 period is partial and subject to reporting lag.

## Annual counts

| Year | Broad | US 90 continuation |
|---|---:|---:|
| 2019 | 8 | 2 |
| 2020 | 6 | 3 |
| 2021 | 4 | 2 |
| 2022 | 4 | 0 |
| 2023 | 3 | 4 |
| 2024 | 11 | 1 |
| 2025 | 8 | 5 |
| 2026 (partial) | 9 | 2 |

## Source reconciliation

1. [City Traffic Incidents 2019–2024](https://services.arcgis.com/VhMjCzR3cIjEkh7L/arcgis/rest/services/Traffic_Incidents_2019_2024/FeatureServer/0): live query `Bicycle='TRUE'`, all fields and WGS84 geometry. Returned 1,256 records, with 1,249 usable coordinates. Seven invalid locations cannot be allocated to a corridor.
2. [ICC eCrash endpoint](https://services.arcgis.com/VhMjCzR3cIjEkh7L/ArcGIS/rest/services/eCrash2019_2023/FeatureServer/0): same 1,256 records. All usable record IDs, dates and coordinates match source 1 and the saved September export exactly. These are duplicate representations, not additional crashes.
3. [City public Power BI dashboard](https://app.powerbigov.us/view?r=eyJrIjoiNjRiNWJjYzctOWUyYy00OGNjLThkOGEtNTg5M2YwNWZjODJmIiwidCI6IjA4Y2JmNDg1LTFjYjctNGEwMi05YTIxLTBkZDliNDViOWZmNyJ9): queried `VwCrash` for `FirstHarmfulEvent` containing `pedalcycle`, and bounding box longitude −90.087 to −90.057, latitude 29.965 to 30.001. Returned 181 unique crash IDs; an independent aggregate query also returned 181. The geographic subset's dates range August 5, 2022–November 4, 2026. This range does not establish the full dashboard's coverage or a complete reporting cutoff.

The dashboard returns 30 corridor records for Broad (3 in 2023, 10 in 2024, 8 in 2025, 9 in 2026), and 12 for the US 90 continuation (4 in 2023, 1 in 2024, 5 in 2025, 2 in 2026). To avoid counting overlapping years twice, the combined totals use ArcGIS exclusively through 2024 and Power BI exclusively from 2025. Do not add all three source totals. The dashboard's older corridor dates align with the ArcGIS results, except that Broad's June 15, 2024 ArcGIS record 92028 is absent from the dashboard's selected corridor/filter; the reason is unverified.

## Shared endpoint and uncertainty

Three records at Broad/St. Bernard belong to both corridor counts: May 9, 2020 (ArcGIS 24753), June 7, 2025 (Power BI 74BD7E94-C3EB-4CB8-9E0A-E6F308A64910), and January 7, 2026 (Power BI 4093389B-4D19-45D3-9ADA-2202F63415DE). Thus the two corridors together contain **69 distinct identified records**, not 72.

The prior conservative street-assignment audit classifies only 1 of Broad's 36 historical records and 2 of the continuation's 12 as clear coordinate-to-street matches. The other 35 and 10 are unresolved near junctions/competing streets. This does not negate intersection crashes; it means the data cannot establish an exclusive street of occurrence. No equivalent assignment audit was run on the newer Power BI records.

Buffer sensitivity: historical counts remain 36 and 12 at 15 metres and become 37 and 13 at 50 metres. For the added 2025–2026 records, counts are 16 and 7 at 15 metres, 17 and 7 at 30 metres, and 18 and 8 at 50 metres. These are alternate geographic definitions, not statistical confidence intervals.

Across the combined selected records, each corridor has 6 crashes classified as suspected serious injury and none classified fatal. Severity describes the crash; it does not establish which participant suffered the injury. These are crash counts, not numbers of injured cyclists or risk per trip.

## Saved evidence

- `corridor-records.csv`: the 72 corridor memberships representing 69 distinct identified records, with source IDs, dates, severity, coordinates and distances.
- `annual-counts.csv`: yearly corridor counts.
- `map.html`: interactive local map and record table. Historical IDs link directly to the official ArcGIS record; newer IDs open live viewers that query one crash directly from the public Power BI API each time they open. They are not city-hosted permalinks. Saved snapshots remain separately available. The CSV includes `source_record_url`, `dashboard_url`, `live_record_path` and `saved_record_path`. Ordinary GET requests to the Power BI query endpoint return HTTP 405; Microsoft documents that Publish to web does not support URL query-string filters. These links expose dataset records, not the full police reports.
- Full raw responses and reproducibility scripts are retained in the original analysis project.

Attribution: City of New Orleans crash services and public dashboard; street geometry © OpenStreetMap contributors, ODbL. Read the source metadata before redistributing compiled source data.
