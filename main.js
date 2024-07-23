function iniciarJuego() {
    let juego = {
        opciones: ["piedra", "papel", "tijera"],
        nombreUsuario: "",
        resultados: [],
        numeroAdivinar: 0,
    };

    const gameArea = document.getElementById('gameArea');

    function mostrarMensaje(mensaje, clase = '') {
        const msgDiv = document.createElement('div');
        msgDiv.className = clase;
        msgDiv.textContent = mensaje;
        gameArea.appendChild(msgDiv);
    }

    function limpiarMensajes() {
        gameArea.innerHTML = '';
    }

    function mostrarFormularioInicial() {
        limpiarMensajes();
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="nombreUsuario">Ingresa tu nombre:</label>
            <input type="text" id="nombreUsuario" required>
            <button type="submit">Comenzar</button>
        `;
        form.onsubmit = (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombreUsuario').value;
            if (nombre) {
                juego.nombreUsuario = nombre;
                jugar();
            } else {
                mostrarMensaje('Por favor, ingresa tu nombre.', 'alert');
            }
        };
        gameArea.appendChild(form);
    }

    function mostrarOpcionesDeJuego() {
        limpiarMensajes();
        const btnPPT = document.createElement('button');
        btnPPT.textContent = 'Piedra, papel o tijera';
        btnPPT.onclick = jugarPiedraPapelTijera;

        const btnAdivinar = document.createElement('button');
        btnAdivinar.textContent = 'Adivinar un número';
        btnAdivinar.onclick = jugarAdivinarNumero;

        gameArea.appendChild(btnPPT);
        gameArea.appendChild(btnAdivinar);
    }

    function jugar() {
        mostrarOpcionesDeJuego();
    }

    function jugarPiedraPapelTijera() {
        limpiarMensajes();
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="opcionUsuario">Elige piedra, papel o tijera:</label>
            <input type="text" id="opcionUsuario" required>
            <button type="submit">Jugar</button>
        `;
        form.onsubmit = (e) => {
            e.preventDefault();
            const opcionUsuario = document.getElementById('opcionUsuario').value.toLowerCase();
            if (juego.opciones.indexOf(opcionUsuario) !== -1) {
                let opcionJugador = juego.opciones[Math.floor(Math.random() * juego.opciones.length)];
                mostrarMensaje("Elegiste: " + opcionUsuario);
                mostrarMensaje("Francisco eligió: " + opcionJugador);
                let resultado = validarResultado(opcionUsuario, opcionJugador);
                juego.resultados.push(resultado);
                setTimeout(mostrarOpcionesDeJuego, 2000);
            } else {
                mostrarMensaje("Opción incorrecta. Por favor, elige piedra, papel o tijera.", 'alert');
            }
        };
        gameArea.appendChild(form);
    }

    function jugarAdivinarNumero() {
        limpiarMensajes();
        juego.numeroAdivinar = Math.floor(Math.random() * 10) + 1;
        let intentos = 0;
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="numeroUsuario">Adivina el número (entre 1 y 10):</label>
            <input type="number" id="numeroUsuario" min="1" max="10" required>
            <button type="submit">Adivinar</button>
        `;
        form.onsubmit = (e) => {
            e.preventDefault();
            let numeroUsuario = parseInt(document.getElementById('numeroUsuario').value);
            intentos++;
            if (numeroUsuario === juego.numeroAdivinar) {
                mostrarMensaje(`¡Felicitaciones! Adivinaste el número ${juego.numeroAdivinar} en ${intentos} intentos.`);
                setTimeout(mostrarOpcionesDeJuego, 2000);
            } else if (numeroUsuario < juego.numeroAdivinar) {
                mostrarMensaje("El número que estás buscando es mayor.");
            } else {
                mostrarMensaje("El número que estás buscando es menor.");
            }
        };
        gameArea.appendChild(form);
    }

    function validarResultado(opcionUsuario, opcionJugador) {
        if (opcionUsuario === opcionJugador) {
            mostrarMensaje("Es un empate!");
            return "Empate";
        } else if (
            (opcionUsuario === "piedra" && opcionJugador === "tijera") ||
            (opcionUsuario === "papel" && opcionJugador === "piedra") ||
            (opcionUsuario === "tijera" && opcionJugador === "papel")
        ) {
            mostrarMensaje("Ganaste!");
            return "Ganaste";
        } else {
            mostrarMensaje("Perdiste!");
            return "Perdiste";
        }
    }

    mostrarFormularioInicial();
}

iniciarJuego();
