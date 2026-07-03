function cargarNoticiasIniciales() {
    const noticias = JSON.parse(localStorage.getItem("noticias"));

    if (!noticias || noticias.length === 0) {
        localStorage.setItem("noticias", JSON.stringify(NOTICIAS_INICIALES));
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
            <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
        `;

        contenedor.appendChild(articulo);
    });
}

function renderizarDeportes() {
    const contenedor =
        document.getElementById("deportes-container");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    const noticias =
        JSON.parse(localStorage.getItem("noticias")) || [];
    const deportes =
        noticias.filter(
            noticia => noticia.categoria === "deporte"
        );
    deportes.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function renderizarMusica() {
    const contenedor = document.getElementById("musica-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    const musica = noticias.filter(function(noticia) {
        return noticia.categoria === "musica";
    });

    musica.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function renderizarGaming() {
    const contenedor = document.getElementById("gaming-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    const gaming = noticias.filter(function(noticia) {
        return noticia.categoria === "gaming";
    });

    gaming.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function renderizarChisme() {
    const contenedor = document.getElementById("chisme-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    const chisme = noticias.filter(function(noticia) {
        return noticia.categoria === "chisme";
    });

    chisme.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function renderizarModa() {
    const contenedor = document.getElementById("moda-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    const moda = noticias.filter(function(noticia) {
        return noticia.categoria === "moda";
    });

    moda.forEach(function(noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
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
        boton.textContent = "Modo Claro";
    }
    boton.addEventListener("click", function() {
        document.body.classList.toggle("dark");
        const estaOscuro = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", estaOscuro ? "activado" : "desactivado");
        boton.textContent = estaOscuro ? "Modo Claro" : "Modo Oscuro";
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

cargarNoticiasIniciales();
renderizarNoticias();
renderizarDeportes();
renderizarMusica();
renderizarChisme();
renderizarGaming();
renderizarModa();
iniciarModoOscuro();
cargarCotizacionDolar();
iniciarBuscador();
