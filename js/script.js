const NOTICIAS_INICIALES = [
    {  
        titulo: "Lo ultimo de Basketball! ¿Las nuevas estrellas del Basketball creceran en Puerto Rico?",
        descripcion: "La primera NBA Basketball School se inaugura en Puerto Rico",
        imagen: "https://images.unsplash.com/photo-1546519638-68e109498ffc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFza2V0YmFsbCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
        categoria: "deporte",
        destacada: false,
        link: "noticias/deporte/nba.html",
    },
    {
        titulo:"Así queda el Mundial de F1 2026 tras el GP de Mónaco: puntos y posiciones.",
        descripcion:"Las clasificaciones de pilotos y constructores del Mundial de Fórmula 1 2026 tras el Gran Premio de Mónaco, con Andrea Kimi Antonelli, italiano de 19 años, ampliando su ventaja al frente del campeonato.",
        imagen:"https://elsoldechiapas.com/wp-content/uploads/2026/06/LAS-INTELIGENCIAS-ARTIFICIALES-YA-ELIGIERON-%C2%BFQUIEN-SERA-EL-CAMPEON-DEL-MUNDIAL-2026-9-768x615.webp",
        categoria: "deporte",
        destacada: true,
        link:"noticias/deporte/formulauno.html",

    },
    {
        titulo: "Acertó los últimos cuatro campeones del mundo y ahora predijo quién levantará el trofeo en el Mundial de Fútbol 2026",
        descripcion:"La empresa de videojuegos deportivos simuló el torneo al igual que lo hizo en Sudáfrica 2010, Brasil 2014, Rusia 2018 y Qatar 2022",
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS9Cde_6xJaGSYDeaUzKPHjb-HkVbVNdZYQ&s",
        categoria:"deporte",
        destacada: false,
        link:"noticias/deporte/futbol.html",
    },
    {
        titulo:"Argentina en la VNL 2026: Previa, jugadores, calendario de partidos y cómo ver.",
        descripcion:"El equipo sudamericano buscará regresar a la fase final del torneo tras quedar eliminado en la primera ronda en 2025. Conoce el calendario, horarios y las claves para seguir a Argentina en la VNL 2026.",
        imagen:"https://www.ole.com.ar/2025/09/16/vSMDD1uJI_720x0__1.jpg",
        categoria:"deporte",
        destacada: false,
        link: "noticias/deporte/voleymasculino.html",
    },
    {
        titulo:"Las Panteras vuelven a la acción: agenda y convocadas para los amistosos ante Bulgaria.",
        descripcion:"La Selección Argentina inicia su calendario internacional 2026 con dos encuentros en Santa Fe y Rosario. Aquí, un repaso del cronograma completo de la serie y la lista elegida por Facundo Morando.",
        imagen:"https://feva.org.ar/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-25-at-22.45.57.jpeg",
        categoria:"deporte",
        destacada: false,
        link:"noticias/deporte/voleyfemenino.html",
    },
    {
        titulo:"Argentina se subió al podio en el Sudamericano de Remo de Brasil.",
        descripcion:"El seleccionado argentino obtuvo 20 medallas para quedarse con el tercer lugar del medallero en el Campeonato para las categorías U19, U23 y adaptadas que se realizó en Porto Alegre.",
        imagen:"https://www.argentina.gob.ar/sites/default/files/2026/03/hthdhbdfb.jpeg",
        categoria:"deporte",
        destacada: false,
        link:"noticias/deporte/remo.html",
    }
];

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
    if (datos.length === 0) {
        contenedor.innerHTML += "<p>No hay noticias publicadas todavía.</p>";
        return;
    }
    
    datos.forEach(function(noticia) {
        const articulo = document.createElement("article");
        articulo.classList.add("noticia");
        articulo.dataset.id = noticia.id;
        articulo.innerHTML = `
            <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <button>Leer más</button>
        `;

        const boton = articulo.querySelector("button");

        boton.addEventListener("click", function () {
            window.location.href = noticia.link;
        });
        contenedor.appendChild(articulo);
    });
}

function renderizarDeportes() {
    console.log("Entró a renderizar deportes");
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
                <a href="${noticia.link}" class="leerMas">
                    Leer más
                </a>
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
//renderizarNoticias();
renderizarDeportes();
iniciarModoOscuro();
cargarCotizacionDolar();
iniciarBuscador();
