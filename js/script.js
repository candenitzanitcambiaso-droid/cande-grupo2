const NOTICIAS_INICIALES = [
    {
        id: 1,
        titulo: "Romeo Beckham lanza su marca de ropa deportiva INTRA",
        descripcion: "El hijo de David Beckham debuta en el mundo de la moda con una línea deportiva que ya genera polémica por su estética hooligan.",
        imagen: "assets/1.jpeg"
    },
    {
        id: 2,
        titulo: "¿Qué países gastan más en artículos de lujo?",
        descripcion: "Un nuevo ranking revela cuáles son las naciones que más invierten en moda y accesorios de alta gama a nivel mundial.",
        imagen: "assets/2.jpeg"
    },
    {
        id: 3,
        titulo: "Messi x Kith: la colección con Adidas que une fútbol y moda",
        descripcion: "Ronnie Fieg y Lionel Messi se unen para lanzar una colección exclusiva de ropa y zapatillas para Adidas Football.",
        imagen: "assets/3.jpeg"
    },
    {
        id: 4,
        titulo: "Las marcas internacionales que llegan a Argentina en 2026",
        descripcion: "Sandro, Mango y otras firmas globales planifican abrir locales en el país. El mapa completo de aperturas previstas.",
        imagen: "assets/4.jpeg"
    },
    {
        id: 5,
        titulo: "Crisis textil: la producción cayó más de 30% desde 2023",
        descripcion: "El sector sigue hundiéndose. Los números muestran una caída sostenida que preocupa a fabricantes y trabajadores del rubro.",
        imagen: "assets/5.jpeg"
    },
    {
        id: 6,
        titulo: "Chrome Hearts: la marca que se hizo imposible de conseguir",
        descripcion: "Sin publicidad, sin e-commerce y con listas de espera eternas. Así se convirtió Chrome Hearts en el objeto de deseo más exclusivo del momento.",
        imagen: "assets/6.jpeg"
    }
];

function cargarNoticiasIniciales() {
    if (!localStorage.getItem("noticias")) {
        localStorage.setItem("noticias", JSON.stringify(NOTICIAS_INICIALES));
    }
}

function renderizarNoticias() {
    const contenedor = document.getElementById("noticias-home");
    if (!contenedor) return;

    const datos = JSON.parse(localStorage.getItem("noticias")) || [];

    contenedor.innerHTML = "<h2>Últimas noticias</h2>";

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

        contenedor.appendChild(articulo);
    });
}

function iniciarModoOscuro() {
    const boton = document.getElementById("modoOscuro");
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

    cargarNoticiasIniciales();
    renderizarNoticias();
    iniciarModoOscuro();
    cargarCotizacionDolar();
    iniciarBuscador();

});
