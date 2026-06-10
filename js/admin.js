if (!sessionStorage.getItem("browserSession")) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
}

if (!localStorage.getItem("adminToken")) {
    window.location.href = "login.html";
}

let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
const formulario = document.getElementById("form-noticia");
const tabla = document.getElementById("tabla-edicion");

function guardarNoticias() {
    localStorage.setItem(
        "noticias",
        JSON.stringify(noticias)
    );
}

formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    const noticia = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };
    noticias.push(noticia);
    guardarNoticias();
    mostrarNoticias();
    formulario.reset();
});

function mostrarNoticias() {
    tabla.innerHTML = "";
    noticias.forEach((noticia, indice) => {
        tabla.innerHTML += `
            <div>
                <h3>${noticia.titulo}</h3>
                <button onclick="modificarNoticia(${indice})">
                    Modificar
                </button>
                <button onclick="eliminarNoticia(${indice})">
                    Eliminar
                </button>
            </div>
        `;
    });
}

function eliminarNoticia(indice) {
    noticias.splice(indice, 1);
    guardarNoticias();
    mostrarNoticias();
}

function modificarNoticia(indice) {
    const noticia = noticias[indice];
    document.getElementById("titulo").value = noticia.titulo;
    document.getElementById("descripcion").value = noticia.descripcion;
    document.getElementById("imagen").value = noticia.imagen;
    noticias.splice(indice, 1);
    guardarNoticias();
    mostrarNoticias();
}

mostrarNoticias();
