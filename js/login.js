document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("adminToken") && sessionStorage.getItem("browserSession")) {
        window.location.href = "admin.html";
        return;
    }

    const formulario   = document.getElementById("formulario-login");
    const errorMsg     = document.getElementById("error-login");
    const cargandoMsg  = document.getElementById("cargando-login");
    const btnIngresar  = document.getElementById("btn-ingresar");

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const usuario    = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        errorMsg.style.display    = "none";
        cargandoMsg.style.display = "block";
        btnIngresar.disabled      = true;

        try {
            const respuesta = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usuario,
                    password: contrasena,
                    expiresInMins: 60
                })
            });

            if (!respuesta.ok) {
                throw new Error("Credenciales inválidas");
            }

            const datos = await respuesta.json();

            localStorage.setItem("adminToken", datos.accessToken);
            localStorage.setItem("adminUser", datos.username);
            sessionStorage.setItem("browserSession", "active");

            window.location.href = "admin.html";

        } catch (error) {
            cargandoMsg.style.display = "none";
            errorMsg.style.display    = "block";
            btnIngresar.disabled      = false;
        }
    });

});

const botonMostrar =
    document.getElementById("mostrar-contrasena");

const inputContrasena =
    document.getElementById("contrasena");

const iconoOjo =
    document.getElementById("icono-ojo");

botonMostrar.addEventListener("click", function () {

    if (inputContrasena.type === "password") {

        inputContrasena.type = "text";

        iconoOjo.src = "assets/ojoscontrasena/abierto.png";

        iconoOjo.alt = "Ocultar contraseña";

    } else {

        inputContrasena.type = "password";

        iconoOjo.src = "assets/ojoscontrasena/cerrado.png";

        iconoOjo.alt = "Mostrar contraseña";
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
const btnFavoritos = document.getElementById("btn-favoritos");

if (btnFavoritos) {
    btnFavoritos.addEventListener("click", function () {
        mostrarFavoritos();
    });
}
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

iniciarModoOscuro();
iniciarMenu();