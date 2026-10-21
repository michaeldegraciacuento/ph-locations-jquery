# PH Locations jQuery

A simple chained dropdown for Philippine locations (Region → Province → City/Municipality → Barangay), built with jQuery and Bootstrap and powered by the [PSGC API](https://psgc.gitlab.io/api/).

## Features

- Cascading dropdowns: picking a region loads its provinces, a province loads its cities/municipalities, and a city loads its barangays
- Handles regions without provinces (such as NCR) by loading cities straight from the region
- Alphabetically sorted options
- Loading states, and an error message if the API can't be reached
- No build step: plain HTML and JavaScript

## Getting started

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ph-locations-jquery
   ```
2. Open `index.html` in your browser, or serve the folder locally:
   ```bash
   npx serve .
   ```

## Files

| File          | Description                                            |
| ------------- | ------------------------------------------------------ |
| `index.html`  | Page markup with the four dropdowns (Bootstrap 4)      |
| `location.js` | Fetches data from the PSGC API and fills the dropdowns |

## API endpoints used

| Data                    | Endpoint                                            |
| ----------------------- | --------------------------------------------------- |
| Regions                 | `/regions/`                                         |
| Provinces of a region   | `/regions/{code}/provinces/`                        |
| Cities of a region      | `/regions/{code}/cities-municipalities/`            |
| Cities of a province    | `/provinces/{code}/cities-municipalities/`          |
| Barangays of a city     | `/cities-municipalities/{code}/barangays/`          |

Base URL: `https://psgc.gitlab.io/api`

## Reading the selected values

Each `<option>` value is its PSGC code, so you can read the selected codes with jQuery:

```js
const regionCode   = $('#region').val();
const provinceCode = $('#province').val();
const cityCode     = $('#cities').val();
const barangayCode = $('#barangays').val();

// To get the name instead of the code:
const cityName = $('#cities option:selected').text();
```

## Credits

Location data comes from the [PSGC API](https://psgc.gitlab.io/api/), which is based on the Philippine Standard Geographic Code published by the Philippine Statistics Authority.
