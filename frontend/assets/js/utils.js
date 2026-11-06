// Luma Skin — shared helpers (no framework). Always show user data via textContent, never innerHTML.
window.Utils = {
  // SPEC §12: trim, uppercase English letters only (a-z), keep inner spaces.
  normalizeSku(value) {
    return String(value ?? '').trim().replace(/[a-z]+/g, s => s.toUpperCase());
  },
  // Build an element safely. children: strings (as text) or nodes.
  el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v === true ? '' : v);
    }
    [].concat(children).forEach(c => node.append(c instanceof Node ? c : String(c)));
    return node;
  },
  // DB times are UTC (DATABASE.md §8). ASSUMPTION: timezone-less strings are UTC.
  formatDateTime(value) {
    if (!value) return '-';
    let s = String(value);
    if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(s)) s = s.replace(' ', 'T') + 'Z';
    const d = new Date(s);
    if (isNaN(d)) return '-';
    return new Intl.DateTimeFormat('th-TH-u-ca-gregory', {
      timeZone: window.CONFIG.TIMEZONE, dateStyle: 'medium', timeStyle: 'short'
    }).format(d);
  },
  // ASSUMPTION (B6): price shown in Thai baht.
  formatPrice(value) {
    const n = Number(value);
    if (!isFinite(n)) return '-';
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(n);
  },
  debounce(fn, ms = 300) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  },
  // Show a field-level error under an input (container must be .field).
  setFieldError(input, message) {
    const field = input.closest('.field');
    field.classList.toggle('has-error', !!message);
    let box = field.querySelector('.error-text');
    if (!message) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement('div'); box.className = 'error-text'; field.append(box); }
    box.textContent = message;
  },
  setLoading(btn, on) { btn.classList.toggle('is-loading', on); btn.disabled = on; }
};
