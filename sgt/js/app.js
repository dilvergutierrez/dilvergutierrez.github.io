/* SGT - Core Application Module */
const SGT = {
  VERSION: '0.1.0-prototype',

  /* ── State ── */
  state: {
    currentUser: null,
    currentMode: 'propietario', // aficionado | propietario
    currentGalpon: null,
  },

  /* ── Init ── */
  init() {
    this.state.currentUser = this.getUser();
    this.state.currentMode = localStorage.getItem('sgt_mode') || 'propietario';
    this.state.currentGalpon = localStorage.getItem('sgt_galpon_id') || null;
    this.initModeToggle();
    this.updateNavbar();
    this.highlightActiveLink();
  },

  /* ── Auth helpers ── */
  getUser() {
    const u = localStorage.getItem('sgt_user');
    return u ? JSON.parse(u) : null;
  },
  setUser(user) {
    localStorage.setItem('sgt_user', JSON.stringify(user));
    this.state.currentUser = user;
  },
  logout() {
    localStorage.removeItem('sgt_user');
    localStorage.removeItem('sgt_mode');
    window.location.href = 'login.html';
  },
  requireAuth() {
    if (!this.getUser()) { window.location.href = 'login.html'; return false; }
    return true;
  },

  /* ── Mode Toggle ── */
  setMode(mode) {
    this.state.currentMode = mode;
    localStorage.setItem('sgt_mode', mode);
    document.querySelectorAll('.mode-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  },
  initModeToggle() {
    document.querySelectorAll('.mode-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === this.state.currentMode);
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
    });
  },

  /* ── Navbar ── */
  updateNavbar() {
    const userEl = document.getElementById('navbar-user-name');
    if (userEl && this.state.currentUser) {
      userEl.textContent = this.state.currentUser.nombre;
    }
  },
  highlightActiveLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link, .navbar-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page) a.classList.add('active');
    });
  },

  /* ── Toast ── */
  toast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> ${message}`;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
  },

  /* ── Modal ── */
  openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
  },
  closeModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
  },

  /* ── Utility ── */
  uuid() {
    return 'xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  },
  formatDate(d) {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  },
  calcAge(birthDate) {
    if (!birthDate) return '—';
    const b = new Date(birthDate), now = new Date();
    const months = (now.getFullYear() - b.getFullYear()) * 12 + now.getMonth() - b.getMonth();
    return months < 12 ? `${months}m` : `${Math.floor(months / 12)}a ${months % 12}m`;
  },

  /* ── Mobile Sidebar Toggle ── */
  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    let overlay = document.getElementById('sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebar-overlay';
      overlay.className = 'sidebar-overlay';
      overlay.addEventListener('click', () => this.toggleSidebar());
      document.body.appendChild(overlay);
    }
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  },

  /* ── Sidebar HTML ── */
  renderSidebar(activeLink) {
    return `
    <aside class="sidebar" id="app-sidebar">
      <button class="btn btn-ghost btn-icon mobile-menu-close" onclick="SGT.toggleSidebar()" style="display:none;position:absolute;right:0.5rem;top:0.5rem;font-size:1.1rem;z-index:1001">✕</button>
      <div class="sidebar-section">
        <div style="padding:0 .75rem;margin-bottom:1.5rem">
          <a href="dashboard.html" style="font-size:1.25rem;font-weight:800;color:var(--text-accent);display:flex;align-items:center;gap:.5rem">
            <span>🐓</span> SGT
          </a>
        </div>
        <div class="sidebar-title">General</div>
        <a href="dashboard.html" class="sidebar-link ${activeLink==='dashboard'?'active':''}">📊 Dashboard</a>
        <a href="fan-feed.html" class="sidebar-link ${activeLink==='fan-feed'?'active':''}">📡 Feed en Vivo</a>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Criadero</div>
        <a href="galpon.html" class="sidebar-link ${activeLink==='galpon'?'active':''}">🏠 Mi Galpón</a>
        <a href="ejemplares.html" class="sidebar-link ${activeLink==='ejemplares'?'active':''}">🐔 Ejemplares</a>
        <a href="camadas.html" class="sidebar-link ${activeLink==='camadas'?'active':''}">🥚 Camadas</a>
        <a href="pedigree.html" class="sidebar-link ${activeLink==='pedigree'?'active':''}">🌳 Pedigree</a>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Competencia</div>
        <a href="torneos.html" class="sidebar-link ${activeLink==='torneos'?'active':''}">🏆 Torneos</a>
        <a href="mesa-juez.html" class="sidebar-link ${activeLink==='mesa-juez'?'active':''}">⚖️ Mesa de Juez</a>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Gestión</div>
        <a href="personal.html" class="sidebar-link ${activeLink==='personal'?'active':''}">👥 Personal</a>
        <a href="suscripcion.html" class="sidebar-link ${activeLink==='suscripcion'?'active':''}">💎 Suscripción</a>
        <a href="backoffice.html" class="sidebar-link ${activeLink==='backoffice'?'active':''}">🔧 Backoffice</a>
      </div>
      <div class="sidebar-section" style="margin-top:auto;border-top:1px solid var(--glass-border);padding-top:1rem">
        <a href="#" class="sidebar-link" onclick="SGT.logout();return false;">🚪 Cerrar Sesión</a>
      </div>
    </aside>`;
  },

  /* ── Top bar for inner pages ── */
  renderTopBar() {
    const user = this.state.currentUser;
    const name = user ? user.nombre : 'Usuario';
    return `
    <div class="flex items-center justify-between mb-6 mobile-topbar" style="padding-bottom:1rem;border-bottom:1px solid var(--glass-border)">
      <div class="flex items-center gap-2">
        <button class="btn btn-ghost btn-icon mobile-menu-btn" onclick="SGT.toggleSidebar()" style="display:none;font-size:1.25rem">☰</button>
        <span class="mobile-logo" style="display:none;font-size:1.25rem;font-weight:800;color:var(--text-accent)">🐓 SGT</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="mode-toggle">
          <button class="mode-option" data-mode="aficionado">👁 Aficionado</button>
          <button class="mode-option" data-mode="propietario">🔧 Propietario</button>
        </div>
        <span class="user-greeting" style="font-size:.875rem;color:var(--text-secondary)">Hola, <strong style="color:var(--text-primary)">${name}</strong></span>
      </div>
    </div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => SGT.init());
