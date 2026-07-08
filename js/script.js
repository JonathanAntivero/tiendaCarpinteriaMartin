/* ============================
   CARPINTERÍA MARTÍN — lógica
   ============================ */

/* ---- CONFIGURACIÓN ---- */

const NUMERO_WHATSAPP = "5491137664179";
const ALIAS_TRANSFERENCIA = "jonathan.antivero.1";

/* ---- PRODUCTOS ---- */

const productos = [
  { id: 1,  nombre: "Mesa de comedor Roble",      medidas: "160 x 90 cm",   precio: 450000, img: "img/foto01.jpg" },
  { id: 2,  nombre: "Escritorio Nórdico",          medidas: "120 x 60 cm",   precio: 180000, img: "img/foto02.jpg" },
  { id: 3,  nombre: "Biblioteca Modular",          medidas: "180 x 90 cm",   precio: 220000, img: "img/foto03.jpg" },
  { id: 4,  nombre: "Cama 2 plazas c/ cabecera",   medidas: "140 x 190 cm",  precio: 310000, img: "img/foto04.jpg" },
  { id: 5,  nombre: "Mesa ratona Tronco",          medidas: "100 x 50 cm",   precio: 95000,  img: "img/foto06.jpg" },
  { id: 6,  nombre: "Silla Windsor (unidad)",      medidas: "45 x 45 x 90 cm", precio: 45000, img: "img/foto07.jpg" },
  { id: 7,  nombre: "Estantería Flotante (set x3)", medidas: "60 x 20 cm c/u", precio: 60000, img: "img/foto08.jpg" },
  { id: 8,  nombre: "Placard 2 puertas",            medidas: "100 x 200 cm",  precio: 380000, img: "img/foto09.jpg" },
  { id: 9,  nombre: "Banco de entrada",             medidas: "90 x 35 cm",    precio: 120000, img: "img/foto10.jpg" },
  { id: 10, nombre: "Mueble de TV Rústico",         medidas: "150 x 45 cm",   precio: 210000, img: "img/foto11.jpg" },
  { id: 11, nombre: "Perchero de pie",              medidas: "40 x 40 x 175 cm", precio: 55000, img: "img/foto12.jpg" },
  { id: 12, nombre: "Mesa de luz (par)",            medidas: "40 x 35 cm c/u", precio: 70000, img: "img/foto13.jpg" },
];

/* ---- ESTADO DEL CARRITO ---- */
let carrito = JSON.parse(localStorage.getItem("carritoCM")) || [];

/* ---- HELPERS ---- */
function formatearPrecio(num) {
  return "$" + num.toLocaleString("es-AR");
}
function guardarCarrito() {
  localStorage.setItem("carritoCM", JSON.stringify(carrito));
}

/* ---- RENDER PRODUCTOS ---- */
function renderProductos() {
  const grid = document.getElementById("gridProductos");
  grid.innerHTML = productos.map(p => `
    <div class="card">
      <img class="card__img" src="${p.img}" alt="${p.nombre}" loading="lazy">
      <div class="card__body">
        <span class="card__nombre">${p.nombre}</span>
        <span class="card__medidas">${p.medidas}</span>
        <span class="card__precio">${formatearPrecio(p.precio)}</span>
        <button class="card__btn" data-id="${p.id}">Agregar al carrito</button>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".card__btn").forEach(btn => {
    btn.addEventListener("click", () => agregarAlCarrito(Number(btn.dataset.id)));
  });
}

/* ---- CARRITO: lógica ---- */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(i => i.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, img: producto.img, cantidad: 1 });
  }
  guardarCarrito();
  renderCarrito();
  abrirCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== id);
  }
  guardarCarrito();
  renderCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito();
  renderCarrito();
}

function calcularTotal() {
  return carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
}

/* ---- CARRITO: render ---- */
function renderCarrito() {
  const cont = document.getElementById("carritoItems");
  const badge = document.getElementById("cartBadge");
  const totalEl = document.getElementById("carritoTotal");

  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  badge.textContent = totalItems;

  if (carrito.length === 0) {
    cont.innerHTML = `<p class="carrito__vacio">Todavía no agregaste productos.</p>`;
  } else {
    cont.innerHTML = carrito.map(i => `
      <div class="item-carrito">
        <img src="${i.img}" alt="${i.nombre}">
        <div class="item-carrito__info">
          <div class="item-carrito__nombre">${i.nombre}</div>
          <div class="item-carrito__precio">${formatearPrecio(i.precio)} c/u</div>
          <div class="item-carrito__cant">
            <button data-accion="restar" data-id="${i.id}">-</button>
            <span>${i.cantidad}</span>
            <button data-accion="sumar" data-id="${i.id}">+</button>
          </div>
          <button class="item-carrito__quitar" data-accion="quitar" data-id="${i.id}">Quitar</button>
        </div>
      </div>
    `).join("");
  }

  totalEl.textContent = formatearPrecio(calcularTotal());

  cont.querySelectorAll("button[data-accion]").forEach(btn => {
    const id = Number(btn.dataset.id);
    const accion = btn.dataset.accion;
    btn.addEventListener("click", () => {
      if (accion === "sumar") cambiarCantidad(id, 1);
      if (accion === "restar") cambiarCantidad(id, -1);
      if (accion === "quitar") eliminarDelCarrito(id);
    });
  });
}

/* ---- ABRIR / CERRAR CARRITO ---- */
const carritoEl = document.getElementById("carrito");
const overlayEl = document.getElementById("overlay");

function abrirCarrito() {
  carritoEl.classList.add("activo");
  overlayEl.classList.add("activo");
}
function cerrarCarrito() {
  carritoEl.classList.remove("activo");
  overlayEl.classList.remove("activo");
}

document.getElementById("btnCarrito").addEventListener("click", abrirCarrito);
document.getElementById("btnCerrarCarrito").addEventListener("click", cerrarCarrito);
overlayEl.addEventListener("click", cerrarCarrito);
document.getElementById("btnIrContacto").addEventListener("click", cerrarCarrito);

/* ---- COPIAR ALIAS ---- */
document.getElementById("btnCopiarAlias").addEventListener("click", () => {
  navigator.clipboard.writeText(ALIAS_TRANSFERENCIA).then(() => {
    const btn = document.getElementById("btnCopiarAlias");
    const original = btn.textContent;
    btn.textContent = "¡Copiado!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
});

/* ---- FORMULARIO DE CONTACTO -> WHATSAPP ---- */
document.getElementById("formContacto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (carrito.length === 0) {
    alert("Todavía no agregaste ningún producto al carrito.");
    return;
  }

  let mensaje = `¡Hola! Quiero hacer un pedido en Carpintería Martín.%0A%0A`;
  mensaje += `*Productos:*%0A`;
  carrito.forEach(i => {
    mensaje += `- ${i.nombre} x${i.cantidad} — ${formatearPrecio(i.precio * i.cantidad)}%0A`;
  });
  mensaje += `%0A*Total: ${formatearPrecio(calcularTotal())}*%0A%0A`;
  mensaje += `*Nombre:* ${nombre}%0A`;
  mensaje += `*Teléfono:* ${telefono}%0A`;
  if (direccion) mensaje += `*Dirección:* ${direccion}%0A`;
  if (comentario) mensaje += `*Comentario:* ${comentario}%0A`;
  mensaje += `%0APago por transferencia al alias: ${ALIAS_TRANSFERENCIA}`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  window.open(url, "_blank");
});

/* ---- INIT ---- */
renderProductos();
renderCarrito();
