# Luma Skin — Frontend (Stage 1: Setup)

HTML5 + CSS3 + Vanilla JS + Fetch API. No frameworks, no build step.

## Run
Open `styleguide.html` in a browser (or serve the folder: `python -m http.server`).
`assets/js/config.js` has `USE_MOCK: true`, so no Backend is needed yet.

## Structure
- `assets/css/style.css` tokens + app shell; `components.css` buttons, forms, tables, badges, modal, toast
- `assets/js/config.js` base URL, mock switch, page sizes · `utils.js` helpers (`normalizeSku`, formatters)
- `assets/js/api.js` the only Backend access layer · `mock.js` TEMPORARY fake data · `layout.js` sidebar/topbar/toast/confirm
- Added beyond the prompt's structure: `config.js`, `utils.js`, `layout.js`, `mock.js` (approved)

## Assumptions to confirm in API.md
Endpoint paths (`ENDPOINTS` in api.js), CSRF header `X-CSRF-Token` + `/auth/csrf`, error body `{message, errors:{field:msg}}`, DB datetimes without timezone are UTC.

## Mock data
Everything in `mock.js` is fake. Stage 1 mocks auth only. Delete `mock.js` and set `USE_MOCK:false` at integration.
