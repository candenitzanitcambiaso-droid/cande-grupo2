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
console.log("admin.js cargó");
console.log(btnGuardar);

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

    document.getElementById("noticia-destacada").checked = false;

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

    const categoriaSeleccionada =
        document.querySelector('input[name="categoria"]:checked');
    
    if (!categoriaSeleccionada) {
    alert("Seleccione una categoría.");
    return;
    }
    const categoria = categoriaSeleccionada.value;

    const destacada =
    document.getElementById("noticia-destacada").checked;

    const noticiaId= document.getElementById("noticia-id").value;

    const cantidadDestacadas =
        noticias.filter(n => n.destacada).length;

    const yaEraDestacada =
        noticiaId !== "" && noticias[noticiaId]?.destacada;

    if (destacada && !yaEraDestacada && cantidadDestacadas >= 3) {
        alert("Solo puede haber 3 noticias destacadas.");
        return;
    }

    if (!titulo || !descripcion || !imagen) {
        alert("Complete todos los campos.");
        return;
    }

    try {
        new URL(imagen);
    } catch {
        alert("Ingrese una URL válida.");
        return;
    }
    const id =
        document.getElementById("noticia-id").value;
    
    const noticiaVieja = 
        id==""? {} : noticias[id];
    
    const noticia = {
        id: id === ""
            ? Date.now() + Math.floor(Math.random() * 1000000)
            : noticiaVieja.id,
        titulo,
        descripcion,
        imagen,
        categoria,
        destacada,
    };

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

    document.getElementById("noticia-id").value = indice;

    document.getElementById("noticia-titulo").value = noticia.titulo;

    document.getElementById("noticia-descripcion").value = noticia.descripcion;

    document.getElementById("noticia-imagen").value = noticia.imagen;

    const radio = document.querySelector(
        `input[name="categoria"][value="${noticia.categoria}"]`
    );

    if (radio) {
        radio.checked = true;
    }

    document.getElementById("noticia-destacada").checked =
    noticia.destacada;

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

        window.location.href = "index.html";
    }
);

mostrarNoticias();