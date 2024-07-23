let nombreUsuario = "";
let opciones = ["piedra", "papel", "tijera"];
let juegoDiv = document.getElementById("juego");
let resultadoDiv = document.getElementById("resultado");
let partidasGanadas = 0;
let partidasPerdidas = 0;
let partidasEmpatadas = 0;
let partidasJugadas = 0;

function comenzarJuego() {
    nombreUsuario = document.getElementById("nombre").value.trim();

    if (!nombreUsuario) {
        alert("Ingresa tu nombre para comenzar a jugar.");
        return;
    }

    cargarJuego();
    document.getElementById("nombreUsuario").style.display = "none";
    juegoDiv.style.display = "block";
}

function jugar(opcionUsuario) {
    cargarJuego();
    partidasJugadas++;

    let opcionJugador = opciones[Math.floor(Math.random() * opciones.length)];

    resultadoDiv.innerHTML = `
        <p>Hola ${nombreUsuario}, elegiste: ${opcionUsuario}</p>
        <p>Francisco eligió: ${opcionJugador}</p>
    `;

    if (opcionUsuario === opcionJugador) {
        resultadoDiv.innerHTML += "<p>Es un empate!</p>";
        partidasEmpatadas++;
    } else if (
        (opcionUsuario === "piedra" && opcionJugador === "tijera") ||
        (opcionUsuario === "papel" && opcionJugador === "piedra") ||
        (opcionUsuario === "tijera" && opcionJugador === "papel")
    ) {
        resultadoDiv.innerHTML += "<p>Ganaste!</p>";
        partidasGanadas++;
    } else {
        resultadoDiv.innerHTML += "<p>Perdiste!</p>";
        partidasPerdidas++;
    }

    let jugarDeNuevo = confirm("Queres jugar de nuevo?");

    if (!jugarDeNuevo) {
        mostrarResultados();
        reiniciarJuego();
    }
}

function mostrarResultados() {
    resultadoDiv.innerHTML += `<p>Partidas jugadas: ${partidasJugadas}</p>`;
    resultadoDiv.innerHTML += `<p>Partidas ganadas: ${partidasGanadas}</p>`;
    resultadoDiv.innerHTML += `<p>Partidas perdidas: ${partidasPerdidas}</p>`;
    resultadoDiv.innerHTML += `<p>Partidas empatadas: ${partidasEmpatadas}</p>`;
}

function reiniciarJuego() {
    juegoDiv.style.display = "none";
    document.getElementById("nombreUsuario").style.display = "block";
    nombreUsuario = "";
    partidasGanadas = 0;
    partidasPerdidas = 0;
    partidasEmpatadas = 0;
    partidasJugadas = 0;
}

function guardarJuego() {
    let juegoGuardado = {
        nombreUsuario: nombreUsuario,
        opciones: opciones
    };
    localStorage.setItem('juego', JSON.stringify(juegoGuardado));
}

function cargarJuego() {
    let juegoGuardado = localStorage.getItem('juego');
    if (juegoGuardado) {
        let juegoParseado = JSON.parse(juegoGuardado);
        nombreUsuario = juegoParseado.nombreUsuario;
        opciones = juegoParseado.opciones;
        document.getElementById("nombre").value = nombreUsuario;
    }
}

function salirDelJuego() {
    let confirmarSalir = confirm("¿Queres salir del juego?");

    if (confirmarSalir) {
        mostrarResultados();  
        reiniciarJuego();
    }
}