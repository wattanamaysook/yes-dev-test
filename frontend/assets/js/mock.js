// ============================================================
// MOCK DATA — TEMPORARY. Not a real Backend. Used only when CONFIG.USE_MOCK = true.
// Stage 1 mocks auth only; later stages add products, scans, etc.
// ============================================================
window.Mock = {
  user: { id: 1, name: 'Mock Super Admin', email: 'super@example.test', role: 'super_admin' },
  async handle(method, path) {
    await new Promise(r => setTimeout(r, 250));
    if (path === '/auth/csrf') return { csrf_token: 'mock-token' };
    if (path === '/auth/login' || path === '/auth/me') return { user: this.user };
    if (path === '/auth/logout') return {};
    throw new window.ApiError(501, 'MOCK: endpoint นี้ยังไม่มีข้อมูลจำลอง (' + method + ' ' + path + ')');
  }
};
