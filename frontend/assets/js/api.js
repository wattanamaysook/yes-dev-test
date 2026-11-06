// Luma Skin — the ONLY place that talks to the Backend (Fetch API).
// !! All endpoint paths, the CSRF header name and response shapes below are ASSUMPTIONS
// !! until API.md is provided. Change them in ENDPOINTS / request() only.
(function () {
  const C = window.CONFIG;

  class ApiError extends Error {
    constructor(status, message, fields) { super(message); this.status = status; this.fields = fields || {}; }
  }
  window.ApiError = ApiError;

  // ASSUMPTION: endpoint paths (relative to CONFIG.API_BASE_URL)
  const ENDPOINTS = {
    csrf: '/auth/csrf', login: '/auth/login', logout: '/auth/logout', me: '/auth/me',
    dashboard: '/dashboard', products: '/products', categories: '/products/categories',
    importProducts: '/products/import', qr: '/products/qr', scans: '/scans', admins: '/admins',
    publicProduct: '/public/product'
  };
  const CSRF_HEADER = 'X-CSRF-Token'; // ASSUMPTION (A5)
  let csrfToken = null;               // memory only, never localStorage

  async function getCsrf() {
    if (!csrfToken) {
      const r = await request('GET', ENDPOINTS.csrf, { noRedirect: true });
      csrfToken = r && r.csrf_token;
    }
    return csrfToken;
  }

  // opts: { query, json, form (FormData), noRedirect }
  async function request(method, path, opts = {}) {
    if (C.USE_MOCK) return window.Mock.handle(method, path, opts);

    const url = new URL(C.API_BASE_URL + path, location.href);
    Object.entries(opts.query || {}).forEach(([k, v]) => {
      if (v !== '' && v != null) url.searchParams.set(k, v);
    });
    const headers = { Accept: 'application/json' };
    const init = { method, credentials: 'include', headers };
    if (opts.json !== undefined) { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.json); }
    if (opts.form) init.body = opts.form; // browser sets multipart boundary
    if (method !== 'GET' && path !== ENDPOINTS.csrf) headers[CSRF_HEADER] = await getCsrf();

    let res;
    try { res = await fetch(url, init); }
    catch { throw new ApiError(0, 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่อีกครั้ง'); }

    const body = await res.json().catch(() => null);
    if (res.ok) return body;

    if (res.status === 401 && !opts.noRedirect) {            // session expired (SPEC §9)
      if (!location.pathname.endsWith('login.html')) location.href = 'login.html?expired=1';
      throw new ApiError(401, 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
    }
    const fallback = { 403: 'คุณไม่มีสิทธิ์ทำรายการนี้', 404: 'ไม่พบข้อมูล', 409: 'ข้อมูลซ้ำกับที่มีอยู่' }[res.status]
      || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    throw new ApiError(res.status, (body && body.message) || fallback, body && body.errors); // errors: {field: message}
  }

  const E = ENDPOINTS, id = x => '/' + encodeURIComponent(x);
  window.Api = {
    auth: {
      login: (email, password) => request('POST', E.login, { json: { email, password }, noRedirect: true }),
      logout: () => request('POST', E.logout),
      me: () => request('GET', E.me, { noRedirect: true })
    },
    dashboard: { get: range => request('GET', E.dashboard, { query: { range } }) }, // range: today|7d|30d
    products: {
      list: q => request('GET', E.products, { query: q }),            // q: {page, search, category, status}
      categories: () => request('GET', E.categories),
      get: pid => request('GET', E.products + id(pid)),
      create: form => request('POST', E.products, { form }),          // FormData (image upload)
      update: (pid, form) => request('POST', E.products + id(pid), { form }),
      remove: pid => request('DELETE', E.products + id(pid)),         // soft delete
      importFile: form => request('POST', E.importProducts, { form })
    },
    scans: { list: q => request('GET', E.scans, { query: q }) },
    admins: {
      list: q => request('GET', E.admins, { query: q }),
      create: data => request('POST', E.admins, { json: data }),
      setActive: (aid, isActive) => request('POST', E.admins + id(aid) + '/active', { json: { is_active: isActive } })
    },
    publicProduct: { get: sku => request('GET', E.publicProduct, { query: { sku }, noRedirect: true }) },
    qrUrl: sku => new URL(C.API_BASE_URL + E.qr, location.href).href + '?sku=' + encodeURIComponent(sku) // ASSUMPTION (A3)
  };
})();
