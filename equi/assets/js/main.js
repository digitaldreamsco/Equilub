// SPA Navigation, Topbar, Sidebar, Dynamic Content and PowerBI Reportes Support

const USER = [{ name: "Juan Perez", email: "juan@example.com" }];

const ROUTES = {
  dashboard: {
    file: null, // rendered by JS
    label: "Panel de Control",
    icon: "fa-home",
  },
  reportes: {
    file: "views/reportes_smart.html",
    label: "Reportes PowerBI",
    icon: "fa-chart-line"
  },
  usuarios: {
    file: "views/usuarios.html",
    label: "Usuarios",
    icon: "fa-user-plus",
    submenu: [{ label: "Lista de usuarios", route: "usuarios" }]
  },
  clientes: {
    file: "views/clientes.html",
    label: "Clientes",
    icon: "fa-user",
    submenu: [{ label: "Ver clientes", route: "clientes" }]
  },
  servicios: {
    file: "views/servicios.html",
    label: "Servicios",
    icon: "fa-gears",
    submenu: [{ label: "Ver servicios", route: "servicios" }]
  },
  maquinas: {
    file: "views/maquinas.html",
    label: "Máquinas",
    icon: "fa-tractor",
    submenu: [{ label: "Ver máquinas", route: "maquinas" }]
  },
  estudios: {
    file: "views/estudios.html",
    label: "Estudio de Lubricación",
    icon: "fa-book-bookmark",
    submenu: [
      { label: "Ver estudios", route: "estudios" },
      { label: "Ver formato de estudio", route: "formatos" }
    ]
  },
  formatos: {
    file: "views/formatos.html",
    label: "Formatos de Estudio",
    icon: "fa-file-lines"
  },
  cartas: {
    file: "views/cartas.html",
    label: "Carta de Lubricación",
    icon: "fa-id-card",
    submenu: [{ label: "Ver cartas", route: "cartas" }]
  },
  ajustes: {
    file: "views/ajustes.html",
    label: "Ajustes",
    icon: "fa-gear",
    submenu: [{ label: "Generales", route: "ajustes" }]
  }
};

const sidebarMenus = [
  "dashboard",
  "reportes",
  "usuarios",
  "clientes",
  "servicios",
  "maquinas",
  "estudios",
  "cartas",
  "ajustes"
];

// Renders the top bar
function renderTopbar() {
  document.getElementById("topbar").innerHTML = `
    <div style="display:flex;align-items:center;">
      <a href="#dashboard"><img src="https://dummyimage.com/150x35/1e3a8a/fff&text=Logo" class="logo" /></a>
      <div class="search-container">
        <input type="text" class="search-box" id="search-box" placeholder="Buscar..." />
        <i class="fa fa-magnifying-glass search-icon"></i>
      </div>
    </div>
    <div class="topbar-actions">
      <button class="icon-btn" title="Tema"><i class="fa fa-dashboard"></i></button>
      <button class="icon-btn" title="Silenciar"><i class="fa fa-volume-high"></i></button>
      <button class="icon-btn" title="Inactivo"><i class="fa fa-user-alt-slash"></i></button>
      <button class="icon-btn" title="Notificaciones"><i class="fa fa-bell"></i><span class="notif-dot" style="display:inline-block;width:7px;height:7px;background:#ef4444;border-radius:50%;position:absolute;top:8px;right:7px;"></span></button>
      <div class="user-dropdown" id="user-dropdown">
        <button class="user-btn" id="user-btn">
          <i class="fa fa-user-shield"></i>
          <span style="font-weight:normal;">${USER[0].name}</span>
          <i class="fa fa-chevron-down"></i>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <a href="#perfil"><i class="fa fa-user-circle me-2"></i> Mi Perfil <span class="percent-badge">5% Completado</span></a>
          <button id="btn-logout"><i class="fa fa-arrow-right-from-bracket me-2"></i> Cerrar Sesión</button>
        </div>
      </div>
    </div>
  `;
  // Dropdown menu logic
  const userBtn = document.getElementById("user-btn");
  const userDropdown = document.getElementById("user-dropdown");
  userBtn.onclick = function(e) {
    e.stopPropagation();
    userDropdown.classList.toggle("open");
  };
  document.body.addEventListener("click", () => userDropdown.classList.remove("open"));
  document.getElementById("btn-logout").onclick = function() {
    alert("Sesión cerrada (demo)");
  };
  document.getElementById("search-box").onfocus = function() {
    this.select();
  };
}

// Loads sidebar navigation
function renderSidebar(selected) {
  let html = `
    <div class="sidebar-content">
      <button class="menu-btn"><i class="fa fa-plus mr-2"></i> Nuevo</button>
      <ul>
  `;
  sidebarMenus.forEach(key => {
    const route = ROUTES[key];
    if (route.submenu) {
      html += `
        <li>
          <button class="accordion-btn${selected===key ? " active" : ""}" data-key="${key}">
            <i class="fa ${route.icon} mr-2" style="color:#1e3a8a;"></i>
            ${route.label}
            <i class="fa fa-chevron-${selected===key ? "up" : "right"}" style="margin-left:auto;"></i>
          </button>
          <div class="accordion-content" style="display:${selected===key ? "block" : "none"}">
      `;
      route.submenu.forEach(item => {
        html += `<a href="#${item.route}" data-route="${item.route}"><i class="fa fa-angle-right me-2"></i> ${item.label}</a>`;
      });
      html += `</div></li>`;
    } else {
      html += `<li><a class="accordion-btn${selected===key ? " active" : ""}" href="#${key}"><i class="fa ${route.icon} mr-2" style="color:#1e3a8a;"></i> ${route.label}</a></li>`;
    }
  });
  html += `
      </ul>
    </div>
    <div class="version">
      <span style="color: #16a34a;"><i class="fa fa-circle me-2" style="font-size: .75rem;"></i></span>
      Versión 2.0.5
    </div>`;
  document.getElementById("sidebar").innerHTML = html;
  // Accordion logic
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.onclick = function(e) {
      if (btn.tagName==="A") return;
      document.querySelectorAll(".accordion-btn").forEach(b=>{
        b.classList.remove("active");
        const icon = b.querySelector(".fa-chevron-up,.fa-chevron-right");
        if(icon) icon.className = "fa fa-chevron-right";
      });
      document.querySelectorAll(".accordion-content").forEach(c=>c.style.display="none");
      btn.classList.add("active");
      const icon = btn.querySelector(".fa-chevron-right");
      if(icon) icon.className = "fa fa-chevron-up";
      const acc = btn.parentElement.querySelector(".accordion-content");
      if(acc) acc.style.display = "block";
      e.preventDefault();
    };
  });
  // SPA submenu links
  document.querySelectorAll(".accordion-content a,a.accordion-btn").forEach(a=>{
    a.onclick = function(e){
      e.preventDefault();
      const route = a.getAttribute("data-route") || a.getAttribute("href").replace(/^#/,'');
      navigate(route);
    };
  });
}

// SPA router
function navigate(route) {
  let main = route;
  if (main in ROUTES) {
    window.location.hash = "#" + main;
    renderSidebar(main);
    if (main==="dashboard") renderDashboard();
    else loadPage(ROUTES[main].file);
  }
}

// Loads static page and executes <script>
function loadPage(file) {
  if (!file) return;
  fetch(file)
    .then(r => r.text())
    .then(html => {
      const main = document.getElementById('main-content');
      // Limpia el contenido anterior
      main.innerHTML = '';
      // Extraer el JS y el HTML
      const temp = document.createElement('div');
      temp.innerHTML = html;
      // Copia los hijos que no sean <script>
      temp.childNodes.forEach(node => {
        if (node.tagName !== 'SCRIPT') main.appendChild(node.cloneNode(true));
      });
      // Ejecuta el JS del script (si hay)
      const scriptTag = temp.querySelector('script');
      if (scriptTag) {
        const newScript = document.createElement('script');
        newScript.type = "text/javascript";
        newScript.textContent = scriptTag.textContent;
        document.body.appendChild(newScript);
      }
    });
}

// Dashboard render (with charts)
function renderDashboard() {
  document.getElementById("main-content").innerHTML = `
    <h1 class="dashboard-title">Panel de Control</h1>
    <div class="dashboard-cards">
      <div class="card">
        <h3><i class="fa fa-chart-pie"></i> Reporte de los Servicios</h3>
        <hr>
        <div id="donut-chart"></div>
      </div>
      <div class="card">
        <h3><i class="fa fa-list-check"></i> Servicios de hoy</h3>
        <hr>
        <ul class="service-list" id="servicios-actuales"></ul>
      </div>
      <div class="card">
        <h3><i class="fa fa-list"></i> Próximos Servicios</h3>
        <hr>
        <ul class="service-list" id="servicios-proximos"></ul>
      </div>
    </div>
    <div class="dashboard-cards">
      <div class="card">
        <h3><i class="fa fa-building"></i> Estudios de Lubricación por Empresa</h3>
        <hr>
        <div id="area-empresa"></div>
      </div>
      <div class="card">
        <h3><i class="fa fa-book"></i> Estudios de Lubricación</h3>
        <hr>
        <div id="line-lubricacion"></div>
      </div>
    </div>
  `;
  renderServicios();
  renderCharts();
}

// Dummy data
const servicios = {
  actuales: [
    { id: 1, nombre: "Servicio de mantenimiento", hora: "09:00", lugar: "Planta A", trabajador: "Carlos" },
    { id: 2, nombre: "Revisión de máquina", hora: "11:00", lugar: "Planta B", trabajador: "Luis" }
  ],
  proximos: [
    { id: 3, nombre: "Inspección general", hora: "14:00", lugar: "Planta C", trabajador: "Ana" }
  ]
};
function renderServicios() {
  const actuales = document.getElementById('servicios-actuales');
  if (actuales) {
    actuales.innerHTML = '';
    if (servicios.actuales.length) {
      servicios.actuales.forEach(servicio => {
        actuales.innerHTML += `
          <li>
            <div class="font-bold">${servicio.nombre}</div>
            <div style="font-size:.98rem;color:#64748b;">
              <span class="mr-3">${servicio.hora}</span>
              <span class="mr-3">${servicio.lugar}</span>
            </div>
            <div style="font-size:.98rem;color:#64748b;margin-top:3px;">
              <span>Trabajador: ${servicio.trabajador}</span>
            </div>
            <button class="view-btn">Ver más</button>
          </li>
        `;
      });
    } else {
      actuales.innerHTML = `<div class="no-service">
        <img src="https://cdn-icons-png.flaticon.com/512/1995/1995476.png"/>
        <h3>No tienes Servicios Asignados</h3>
      </div>`;
    }
  }
  const proximos = document.getElementById('servicios-proximos');
  if (proximos) {
    proximos.innerHTML = '';
    if (servicios.proximos.length) {
      servicios.proximos.forEach(servicio => {
        proximos.innerHTML += `
          <li>
            <div class="font-bold">${servicio.nombre}</div>
            <div style="font-size:.98rem;color:#64748b;">
              <span class="mr-3">${servicio.hora}</span>
              <span class="mr-3">${servicio.lugar}</span>
            </div>
            <div style="font-size:.98rem;color:#64748b;margin-top:3px;">
              <span>Trabajador: ${servicio.trabajador}</span>
            </div>
            <button class="view-btn">Ver más</button>
          </li>
        `;
      });
    } else {
      proximos.innerHTML = `<div class="no-service">
        <img src="https://cdn-icons-png.flaticon.com/512/1995/1995476.png"/>
        <h3>No tienes Servicios Asignados</h3>
      </div>`;
    }
  }
}
function renderCharts() {
  if (document.querySelector("#donut-chart")) new ApexCharts(document.querySelector("#donut-chart"), {
    series: [44, 55, 41, 17],
    chart: { type: 'donut' },
    labels: ['Activo', 'Pendiente', 'Finalizado', 'En Proceso'],
    colors: ['#00e396', '#feb019', '#e5eaef', '#008ffb'],
    legend: { position: 'bottom' }
  }).render();
  if (document.querySelector("#area-empresa")) new ApexCharts(document.querySelector("#area-empresa"), {
    series: [
      { name: 'Empresa A', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Empresa B', data: [11, 32, 45, 32, 34, 52, 41] },
      { name: 'Empresa C', data: [20, 25, 30, 35, 40, 45, 50] },
      { name: 'Empresa D', data: [15, 22, 18, 29, 33, 38, 42] }
    ],
    chart: { type: 'area', height: 350, stacked: false, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'], title: { text: 'Meses' } },
    yaxis: { title: { text: 'Cantidad de estudios' } },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 90, 100] } },
    legend: { position: 'top', horizontalAlign: 'left' }
  }).render();
  if (document.querySelector("#line-lubricacion")) new ApexCharts(document.querySelector("#line-lubricacion"), {
    series: [{ name: 'Estudios de lubricación', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
    chart: { height: 350, type: 'line' },
    xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'] },
    title: { text: 'Estudios de Lubricación por Mes' }
  }).render();
}

// SPA hash navigation
window.onhashchange = function() {
  let route = window.location.hash.replace(/^#/, '') || 'dashboard';
  navigate(route);
};
window.onload = function() {
  renderTopbar();
  let route = window.location.hash.replace(/^#/, '') || 'dashboard';
  renderSidebar(route);
  if (route==="dashboard") renderDashboard();
  else navigate(route);
};