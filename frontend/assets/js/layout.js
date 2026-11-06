// Luma Skin — shared layout (sidebar, topbar), toast, confirm dialog.
// Page markup needs:  <div class="app-shell" id="shell"><main class="content">...</main></div>
(function () {
  const { el } = window.Utils;
  const NAV = [
    { key: 'dashboard', href: 'dashboard.html', label: 'แดชบอร์ด' },
    { key: 'products', href: 'products.html', label: 'สินค้า' },
    { key: 'import', href: 'import.html', label: 'นำเข้าสินค้า' },
    { key: 'scan-history', href: 'scan-history.html', label: 'ประวัติการสแกน' },
    { key: 'admins', href: 'admins.html', label: 'จัดการแอดมิน', role: 'super_admin' } // UI hint only; Backend enforces
  ];
  const ROLE_LABEL = { super_admin: 'Super Admin', admin: 'Admin' };

  window.Layout = {
    // opts: { page, title, user:{name,role}, onLogout }
    mount({ page, title, user, onLogout }) {
      const shell = document.getElementById('shell');
      const nav = el('nav', { class: 'nav', 'aria-label': 'เมนูหลัก' },
        NAV.filter(n => !n.role || n.role === user.role).map(n =>
          el('a', { href: n.href, ...(n.key === page ? { 'aria-current': 'page' } : {}) }, n.label)));
      const sidebar = el('aside', { class: 'sidebar', id: 'sidebar' },
        [el('div', { class: 'brand' }, ['Luma Skin', el('small', {}, 'ระบบจัดการสินค้า QR')]), nav]);
      const scrim = el('div', { class: 'scrim hidden' });
      const toggle = open => { sidebar.classList.toggle('open', open); scrim.classList.toggle('hidden', !open); };
      scrim.addEventListener('click', () => toggle(false));

      const topbar = el('header', { class: 'topbar' }, [
        el('button', { class: 'btn btn-ghost btn-sm menu-btn', 'aria-label': 'เปิดเมนู', onclick: () => toggle(true) }, 'เมนู'),
        el('h1', {}, title),
        el('div', { class: 'user-chip' }, [
          el('div', { class: 'who' }, [user.name, el('div', { class: 'role' }, ROLE_LABEL[user.role] || user.role)]),
          el('button', { class: 'btn btn-ghost btn-sm', onclick: () => onLogout && onLogout() }, 'ออกจากระบบ')
        ])
      ]);
      const content = shell.querySelector('.content');
      shell.insertBefore(topbar, content);
      shell.prepend(sidebar, scrim);
      document.title = title + ' | Luma Skin';
    },

    toast(message, type = 'info') {
      let box = document.getElementById('toasts');
      if (!box) { box = el('div', { id: 'toasts', 'aria-live': 'polite' }); document.body.append(box); }
      const t = el('div', { class: 'toast ' + type, role: 'status' }, message);
      box.append(t);
      setTimeout(() => t.remove(), 4000);
    },

    // Resolves true (confirmed) or false (cancelled / Esc).
    confirm({ title, message, confirmText = 'ยืนยัน', danger = false }) {
      return new Promise(resolve => {
        const dlg = el('dialog', { class: 'modal' }, [
          el('h2', {}, title), el('p', { class: 'muted' }, message),
          el('div', { class: 'modal-actions' }, [
            el('button', { class: 'btn btn-ghost', onclick: () => dlg.close('no') }, 'ยกเลิก'),
            el('button', { class: 'btn ' + (danger ? 'btn-danger' : 'btn-primary'), onclick: () => dlg.close('yes') }, confirmText)
          ])
        ]);
        dlg.addEventListener('close', () => { resolve(dlg.returnValue === 'yes'); dlg.remove(); });
        document.body.append(dlg);
        dlg.showModal();
      });
    }
  };
})();
