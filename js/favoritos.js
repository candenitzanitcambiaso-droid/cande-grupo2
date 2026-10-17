function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function guardarFavoritos(favoritos) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function quitarFavorito(id) {
    const favoritos = obtenerFavoritos().filter(f => f !== id);
    guardarFavoritos(favoritos);
    mostrarFavoritos();
}

function mostrarFavoritos() {
    const contenedor = document.getElementById("contenedor-favoritos");
    const favoritos  = obtenerFavoritos();
    const noticias   = JSON.parse(localStorage.getItem("noticias")) || [];

    const favoritas = noticias.filter(n => favoritos.includes(n.id));

    contenedor.innerHTML = "";

    if (favoritas.length === 0) {
        contenedor.innerHTML = "<p>Todavía no tenés noticias favoritas.</p>";
        return;
    }

    favoritas.forEach(function (noticia) {
        contenedor.innerHTML += `
            <article class="noticia">
                <button class="btn-favorito" data-id="${noticia.id}">❤️</button>
                <img src="${noticia.imagen}" alt="${noticia.titulo}"
                     onerror="this.src='https://placehold.co/400x200?text=Sin+imagen'">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });

    document.querySelectorAll(".btn-favorito").forEach(function (boton) {
        boton.onclick = function () {
            quitarFavorito(Number(boton.dataset.id));
        };
    });
}

if (localStorage.getItem("darkMode") === "activado") {
    document.body.classList.add("dark");
}

mostrarFavoritos();