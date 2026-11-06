// Luma Skin — runtime config. Change values here only.
window.CONFIG = {
  // ASSUMPTION (A4): API is served from the same origin. Confirm real path in API.md.
  API_BASE_URL: '/api',
  // MOCK MODE: true = use assets/js/mock.js (fake data, NOT real Backend integration).
  // Set to false once Backend is ready.
  USE_MOCK: false,
  TIMEZONE: 'Asia/Bangkok',              // approved A6
  PAGE_SIZE: { products: 10, scans: 20, admins: 10 }, // SPEC §8
  SKU_MAX_LENGTH: 64,                    // ASSUMPTION (B5): from DATABASE.md VARCHAR(64)
  MAX_UPLOAD_MB: 5                       // SPEC §4, §5
};
