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

    document.getElementById("titulo").value =
        noticia.titulo;

    document.getElementById("descripcion").value =
        noticia.descripcion;

    document.getElementById("imagen").value =
        noticia.imagen;

    noticias.splice(indice, 1);

    guardarNoticias();

    mostrarNoticias();
}

mostrarNoticias();
document.addEventListener("DOMContentLoaded", function () {

    const token        = localStorage.getItem("adminToken");
    const sesionActiva = sessionStorage.getItem("browserSession");

    if (!token || !sesionActiva) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        window.location.href = "login.html";
        return;
    }

    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            sessionStorage.removeItem("browserSession");
            window.location.href = "login.html";
        });
    }

    const inputId          = document.getElementById("noticia-id");
    const inputTitulo      = document.getElementById("noticia-titulo");
    const inputDescripcion = document.getElementById("noticia-descripcion");
    const inputImagen      = document.getElementById("noticia-imagen");
    const btnGuardar       = document.getElementById("btn-guardar-noticia");
    const btnCancelar      = document.getElementById("btn-cancelar");
    const tituloFormulario = document.getElementById("titulo-formulario");
    const tablaEdicion     = document.getElementById("tabla-edicion");

    function obtenerNoticias() {
        return JSON.parse(localStorage.getItem("noticias")) || [];
    }

    function guardarNoticias(array) {
        localStorage.setItem("noticias", JSON.stringify(array));
    }

    function renderizarTabla() {
        const noticias = obtenerNoticias();
        tablaEdicion.innerHTML = "";

        if (noticias.length === 0) {
            tablaEdicion.innerHTML = "<p>No hay noticias publicadas todavía.</p>";
            return;
        }

        noticias.forEach(function (noticia) {
            const fila = document.createElement("div");
            fila.classList.add("fila-admin");
            fila.innerHTML = `
                <div class="fila-info">
                    <strong>${noticia.titulo}</strong>
                    <p>${noticia.descripcion}</p>
                </div>
                <div class="fila-acciones">
                    <button class="btn-modificar" data-id="${noticia.id}">Modificar</button>
                    <button class="btn-eliminar" data-id="${noticia.id}">Eliminar</button>
                </div>
            `;
            tablaEdicion.appendChild(fila);
        });

        document.querySelectorAll(".btn-eliminar").forEach(function (btn) {
            btn.addEventListener("click", eliminarNoticia);
        });
        document.querySelectorAll(".btn-modificar").forEach(function (btn) {
            btn.addEventListener("click", cargarParaEditar);
        });
    }

    btnGuardar.addEventListener("click", function () {
        const titulo      = inputTitulo.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const imagen      = inputImagen.value.trim();
        const idExistente = inputId.value;

        if (!titulo || !descripcion) {
            alert("El título y la descripción son obligatorios.");
            return;
        }

        const noticias = obtenerNoticias();

        if (idExistente) {
            const indice = noticias.findIndex(function (n) {
                return String(n.id) === String(idExistente);
            });
            if (indice !== -1) {
                noticias[indice].titulo      = titulo;
                noticias[indice].descripcion = descripcion;
                noticias[indice].imagen      = imagen;
            }
        } else {
            noticias.push({
                id:          Date.now(),
                titulo:      titulo,
                descripcion: descripcion,
                imagen:      imagen
            });
        }

        guardarNoticias(noticias);
        limpiarFormulario();
        renderizarTabla();
    });

    function eliminarNoticia(evento) {
        const id = evento.target.dataset.id;
        if (!confirm("¿Segura que querés eliminar esta noticia?")) return;
        let noticias = obtenerNoticias();
        noticias = noticias.filter(function (n) {
            return String(n.id) !== String(id);
        });
        guardarNoticias(noticias);
        renderizarTabla();
    }

    function cargarParaEditar(evento) {
        const id       = evento.target.dataset.id;
        const noticias = obtenerNoticias();
        const noticia  = noticias.find(function (n) {
            return String(n.id) === String(id);
        });
        if (!noticia) return;

        inputId.value          = noticia.id;
        inputTitulo.value      = noticia.titulo;
        inputDescripcion.value = noticia.descripcion;
        inputImagen.value      = noticia.imagen || "";

        tituloFormulario.textContent = "Editando noticia";
        btnGuardar.textContent       = "Guardar cambios";
        btnCancelar.style.display    = "inline-block";

        document.getElementById("formulario-admin").scrollIntoView({ behavior: "smooth" });
    }

    btnCancelar.addEventListener("click", limpiarFormulario);

    function limpiarFormulario() {
        inputId.value                = "";
        inputTitulo.value            = "";
        inputDescripcion.value       = "";
        inputImagen.value            = "";
        tituloFormulario.textContent = "Nueva noticia";
        btnGuardar.textContent       = "Guardar noticia";
        btnCancelar.style.display    = "none";
    }

    renderizarTabla();

});
