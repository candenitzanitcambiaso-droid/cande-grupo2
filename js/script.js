function cargarNoticiasIniciales() {
    const noticias = JSON.parse(localStorage.getItem("noticias"));
    if (!noticias || noticias.length === 0) {
        const noticiasConId = NOTICIAS_INICIALES.map(function(noticia) {
            return {
                id: Date.now() + Math.floor(Math.random() * 1000000),
                ...noticia
            };
        });
        localStorage.setItem(
            "noticias",
            JSON.stringify(noticiasConId)
        );
    }
}

function renderizarNoticias() {
    const contenedor = document.getElementById("noticias-home");
    if (!contenedor) return;

    const datos = JSON.parse(localStorage.getItem("noticias")) || [];

    const destacadas = datos
        .filter(noticia => noticia.destacada)
        .slice(0, 3);

    if (destacadas.length === 0) {
        contenedor.innerHTML += "<p>No hay noticias destacadas.</p>";
        return;
    }

    destacadas.forEach(function(noticia) {
        const articulo = document.createElement("article");
        articulo.classList.add("noticia"); 

        articulo.innerHTML = `
            <button
                class="btn-favorito"
                data-id="${noticia.id}">
                🤍
            </button>
            <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
        `;

        contenedor.appendChild(articulo);
    });
}

function renderizarCategoria(categoria, idContenedor) {
    const contenedor =
        document.getElementById(idContenedor);
    if (!contenedor) return;
    contenedor.innerHTML = "";
    const noticias =
        JSON.parse(localStorage.getItem("noticias")) || [];
    const filtradas =
        noticias.filter(function(noticia) {
            return noticia.categoria === categoria;
        });
    filtradas.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <button
                    class="btn-favorito"
                    data-id="${noticia.id}">
                    🤍
                </button>
                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function iniciarModoOscuro() {
    const boton = document.getElementById("boton-dark-mode");
    if (!boton) return;
    if (localStorage.getItem("darkMode") === "activado") {
        document.body.classList.add("dark");
        boton.textContent = "🌙 Modo claro";
    }
    boton.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        const estaOscuro =
            document.body.classList.contains("dark");
        localStorage.setItem(
            "darkMode",
            estaOscuro ? "activado" : "desactivado"
        );
        boton.textContent =
            estaOscuro
                ? "☀️ Modo claro"
                : "🌙 Modo oscuro";
    });
}

async function cargarCotizacionDolar() {
    const contenedor = document.getElementById("precio-dolar");
    if (!contenedor) return;
    try {
        const respuesta = await fetch("https://api.bluelytics.com.ar/v2/latest");
        if (!respuesta.ok) {
            throw new Error("Respuesta no exitosa: " + respuesta.status);
        }
        const datos = await respuesta.json();
        const oficialCompra = datos.oficial.value_buy.toFixed(2);
        const oficialVenta  = datos.oficial.value_sell.toFixed(2);
        const blueCompra    = datos.blue.value_buy.toFixed(2);
        const blueVenta     = datos.blue.value_sell.toFixed(2);
        contenedor.innerHTML = `
            💵 Dólar Oficial: $${oficialCompra} / $${oficialVenta} &nbsp;|&nbsp;
            💸 Dólar Blue: $${blueCompra} / $${blueVenta}
        `;
    } catch (error) {
        contenedor.textContent = "No se pudo cargar la cotización en este momento.";
    }
}

function iniciarBuscador() {
    const btnBuscar = document.getElementById("btnbuscar");
    const inputBuscar = document.getElementById("buscar");
    if (!btnBuscar || !inputBuscar) return;
    function filtrar() {
        const texto = inputBuscar.value.toLowerCase().trim();
        const noticias = document.querySelectorAll(".noticia");
        noticias.forEach(function(noticia) {
            const titulo = noticia.querySelector("h3").textContent.toLowerCase();
            const descripcion = noticia.querySelector("p").textContent.toLowerCase();
            const coincide = titulo.includes(texto) || descripcion.includes(texto);
            noticia.style.display = coincide ? "block" : "none";
        });
    }
    btnBuscar.addEventListener("click", filtrar);
    inputBuscar.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") filtrar();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("browserSession")) {
        localStorage.removeItem("adminToken");
    }

    const botonInicio = document.querySelector(".botonInicio");
    if (botonInicio) {
        botonInicio.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

function iniciarMenu() {
    const boton =
        document.getElementById("btn-menu");
    const menu =
        document.getElementById("menu-lateral");
    const cerrar =
        document.getElementById("cerrar-menu");
    if (!boton || !menu || !cerrar) return;
boton.addEventListener("click", function () {
    menu.classList.add("abierto");
    boton.style.display = "none";
});
cerrar.addEventListener("click", function () {
    menu.classList.remove("abierto");
    boton.style.display = "flex";
});
}
function iniciarSesionMenu() {
    const btnLogin = document.getElementById("btn-login");
    const btnAdmin = document.getElementById("btn-admin");
    const btnLogout = document.getElementById("btn-logout");
    const usuarioMenu = document.getElementById("usuario-menu");
    const adminLogueado =
        localStorage.getItem("adminToken") &&
        sessionStorage.getItem("browserSession");
    if (adminLogueado) {
        usuarioMenu.textContent =
            "👤 " + localStorage.getItem("adminUser");
        btnLogin.style.display = "none";
        btnAdmin.style.display = "block";
        btnLogout.style.display = "block";
    }
    btnLogin.addEventListener("click", function () {
        window.location.href = "login.html";
    });
    btnAdmin.addEventListener("click", function () {
        window.location.href = "admin.html";
    });
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        sessionStorage.removeItem("browserSession");
        window.location.reload();
    });
}

cargarNoticiasIniciales();
renderizarNoticias();
renderizarCategoria("deporte", "deportes-container");
renderizarCategoria("musica", "musica-container");
renderizarCategoria("chisme", "chisme-container");
renderizarCategoria("gaming", "gaming-container");
renderizarCategoria("moda", "moda-container");
iniciarModoOscuro();
cargarCotizacionDolar();
iniciarBuscador();
iniciarMenu();
iniciarSesionMenu();