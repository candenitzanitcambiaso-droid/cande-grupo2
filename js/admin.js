if (!sessionStorage.getItem("browserSession")) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
}

if (!localStorage.getItem("adminToken")) {
    window.location.href = "login.html";
}

let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

const btnGuardar = document.getElementById("btn-guardar-noticia");
const btnCancelar = document.getElementById("btn-cancelar");
const tabla = document.getElementById("tabla-edicion");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

function guardarNoticias() {
    localStorage.setItem(
        "noticias",
        JSON.stringify(noticias)
    );
}

function limpiarFormulario() {

    document.getElementById("noticia-id").value = "";

    document.getElementById("noticia-titulo").value = "";

    document.getElementById("noticia-descripcion").value = "";

    document.getElementById("noticia-imagen").value = "";

    btnCancelar.style.display = "none";

    document.getElementById("titulo-formulario").textContent =
        "Nueva noticia";
}

btnGuardar.addEventListener("click", function () {

    const titulo =
        document.getElementById("noticia-titulo").value.trim();

    const descripcion =
        document.getElementById("noticia-descripcion").value.trim();

    const imagen =
        document.getElementById("noticia-imagen").value.trim();

    if (!titulo || !descripcion || !imagen) {
        alert("Complete todos los campos.");
        return;
    }

    const noticia = {
        titulo,
        descripcion,
        imagen
    };

    const id =
        document.getElementById("noticia-id").value;

    if (id === "") {

        noticias.push(noticia);

    } else {

        noticias[id] = noticia;
    }

    guardarNoticias();

    mostrarNoticias();

    limpiarFormulario();
});

function mostrarNoticias() {

    tabla.innerHTML = "";

    noticias.forEach((noticia, indice) => {

        tabla.innerHTML += `
            <article class="noticia-admin">

                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    width="150"
                >

                <h3>${noticia.titulo}</h3>

                <p>${noticia.descripcion}</p>

                <button onclick="modificarNoticia(${indice})">
                    Modificar
                </button>

                <button onclick="eliminarNoticia(${indice})">
                    Eliminar
                </button>

                <hr>

            </article>
        `;
    });
}

function eliminarNoticia(indice) {

    if (
        confirm(
            "¿Seguro que desea eliminar esta noticia?"
        )
    ) {

        noticias.splice(indice, 1);

        guardarNoticias();

        mostrarNoticias();

        limpiarFormulario();
    }
}

function modificarNoticia(indice) {

    const noticia = noticias[indice];

    document.getElementById("noticia-id").value =
        indice;

    document.getElementById("noticia-titulo").value =
        noticia.titulo;

    document.getElementById("noticia-descripcion").value =
        noticia.descripcion;

    document.getElementById("noticia-imagen").value =
        noticia.imagen;

    btnCancelar.style.display = "inline";

    document.getElementById("titulo-formulario").textContent =
        "Modificar noticia";
}

btnCancelar.addEventListener(
    "click",
    limpiarFormulario
);

btnCerrarSesion.addEventListener(
    "click",
    function () {

        localStorage.removeItem("adminToken");

        sessionStorage.removeItem("browserSession");

        window.location.href = "login.html";
    }
);

mostrarNoticias();