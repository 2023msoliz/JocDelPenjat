let paraulaSecreta = "";
let intentsRestants = 0;
const maxIntents = 6;
let lletresUtilitzades = [];
let totalPartides = 0;
let paraulaMostrada = "";
let victories = 0;
let defeats = 0;
const imatgesPenjat = [
    "imagenes/penjat_0.png",
    "imagenes/penjat_1.png",
    "imagenes/penjat_2.png",
    "imagenes/penjat_3.png",
    "imagenes/penjat_4.png",
    "imagenes/penjat_5.png",
    "imagenes/penjat_6.png",
];
let indexImatgeActual = 0;

// Elementos del DOM
const jocPenjat = document.getElementById("jocPenjat");
const botonsAbecedari = document.getElementById("abecedari");
const imatgePenjat = document.getElementById("imatgePenjat");
const lletresUtilitzadesContenedor = document.getElementById("lletresUtilitzades");
const contenedorAlerta = document.getElementById("alertContainer");

// Función para iniciar una nueva partida
function novaPartida() {
    totalPartides++;
    paraulaSecreta = prompt("Introdueix la paraula secreta").toLowerCase();
    mostrarAbecedari();
    mostrarParaulaSecreta();
}

// Función para gestionar el click en una letra
function gestionarClickLletra(lletra) {
    if (lletresUtilitzades.includes(lletra)) {
        mostrarAlerta("alert-warning", `La lletra ${lletra} ja ha estat utilitzada`);
        return;
    }
    lletresUtilitzades.push(lletra);
    if (!paraulaSecreta.includes(lletra)) {
        intentsRestants++;
    }
    actualizarInterfície();
}

// Función para actualizar la interfaz gráfica
function actualizarInterfície() {
    mostrarLletresUtilitzades();
    mostrarImatgePenjat();
    actualizarParaulaMostrada();
    verificarResultat();
}

// Función para mostrar el abecedario en botones
function mostrarAbecedari() {
    const abecedari = 'abcdefghijklmnopqrstuvwxyz';
    for (let lletra of abecedari) {
        const boto = document.createElement("button");
        configurarBotoAbecedari(boto, lletra);
        botonsAbecedari.appendChild(boto);
    }
}

// Función para configurar un botón del abecedario
function configurarBotoAbecedari(boto, lletra) {
    boto.classList.add("btn", "btn-outline-dark", "m-2");
    boto.textContent = lletra.toUpperCase();
    boto.addEventListener("click", function () {
        gestionarClickLletra(lletra);
    });
}

// Función para mostrar la imagen del ahorcado
function mostrarImatgePenjat() {
    const contenedorImatge = document.getElementById("imatgePenjatContainer");
    const indexImatge = (intentsRestants === maxIntents) ? maxIntents : intentsRestants;
    contenedorImatge.innerHTML = `<img src="${imatgesPenjat[indexImatge]}" style="max-width: 100%; height: auto;" />`;
}

// Función para reiniciar el juego
function reiniciarJoc() {
    paraulaSecreta = "";
    intentsRestants = 0;
    lletresUtilitzades = [];
    paraulaMostrada = "";
    indexImatgeActual = 0;
    reiniciarElementHTML(imatgePenjat, imatgesPenjat[indexImatgeActual]);
    reiniciarElementHTML(botonsAbecedari);
    reiniciarElementHTML(jocPenjat);
    mostrarLletresUtilitzades();
}

// Función para reiniciar un elemento HTML (puede cambiar su contenido o imagen)
function reiniciarElementHTML(element, nouSrc = "") {
    if (element) {
        if (element.src) {
            element.src = nouSrc;
        }
        element.innerHTML = "";
    }
}

// Función para mostrar las letras utilizadas
function mostrarLletresUtilitzades() {
    const contenedorLletresUtilitzades = document.getElementById("cajonLletresUtilitzades");
    contenedorLletresUtilitzades.innerHTML = "";
    for (let lletra of lletresUtilitzades) {
        let boto = document.createElement("button");
        configurarBotoLletresUtilitzades(boto, lletra);
        contenedorLletresUtilitzades.appendChild(boto);
    };
}

// Función para configurar un botón de letras utilizadas
function configurarBotoLletresUtilitzades(boto, lletra) {
    boto.textContent = lletra.toUpperCase();
    if (paraulaSecreta.includes(lletra)) {
        boto.classList.add("btn", "btn-success", "m-2");
    } else {
        boto.classList.add("btn", "btn-danger", "m-2");
    }
}

// Función para mostrar la palabra secreta oculta
function mostrarParaulaSecreta() {
    for (let index = 0; index < paraulaSecreta.length; index++) {
        const span = document.createElement("span");
        configurarSpanParaulaOculta(span);
        jocPenjat.appendChild(span);
    }
}

// Función para configurar un span de la palabra oculta
function configurarSpanParaulaOculta(span) {
    span.classList.add("badge", "rounded-pill", "bg-light", "text-dark");
    span.style.fontSize = "2rem";
    span.style.margin = "1rem";
    span.textContent = "_";
}

// Función para actualizar la palabra mostrada con las letras adivinadas
function actualizarParaulaMostrada() {
    paraulaMostrada = "";
    jocPenjat.innerHTML = "";
    for (let lletra of paraulaSecreta) {
        let span = document.createElement("span");
        configurarSpanParaulaMostrada(span, lletra);
        jocPenjat.appendChild(span);
    }
}

// Función para configurar un span de la palabra mostrada
function configurarSpanParaulaMostrada(span, lletra) {
    span.classList.add("badge", "rounded-pill", "bg-light", "text-dark");
    span.style.fontSize = "2rem";
    span.style.margin = "1rem";
    if (lletresUtilitzades.includes(lletra)) {
        span.textContent = lletra;
        paraulaMostrada += lletra;
    } else {
        span.textContent = "_";
    }
}

// Función para mostrar una alerta y luego eliminarla después de 10 segundos
function mostrarAlerta(classe, missatge) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", classe);
    alerta.textContent = missatge;
    contenedorAlerta.appendChild(alerta);
    setTimeout(() => {
        contenedorAlerta.removeChild(alerta);
    }, 10000);
}

// Función para verificar el resultado del juego (victoria o derrota)
function verificarResultat() {
    if (paraulaSecreta === paraulaMostrada) {
        victories++;
        mostrarAlerta("alert-success", "¡Has guanyat!");
        reiniciarJoc();
    }
    if (intentsRestants === maxIntents) {
        defeats++;
        mostrarAlerta("alert-danger", "Lletres fallades " + intentsRestants + "/6: " + lletresUtilitzades.join(", "));
        mostrarAlerta("alert-danger", `¡Has perdut! La paraula era ${paraulaSecreta}`);
        reiniciarJoc();
    }
    emmagatzemarEstadistiques();
}

// Función para almacenar las estadísticas en el almacenamiento local
function emmagatzemarEstadistiques() {
    localStorage.setItem('victories', victories);
    localStorage.setItem('derrotes', defeats);
}

// Función para mostrar las estadísticas
function mostrarEstadisticas() {
    // Obtiene las estadísticas almacenadas o establece el valor predeterminado como 0
    victories = localStorage.getItem('victories') || 0;
    defeats = localStorage.getItem('derrotes') || 0;
    // Calcula el total de partidas jugadas
    const totalPartidas = victories + defeats;
    // Calcula el porcentaje de victorias y derrotas
    const percentatgeVictories = (victories / totalPartidas) * 100;
    const percentatgeDerrotes = (defeats / totalPartidas) * 100;
    // Abre una nueva ventana para mostrar las estadísticas
    const finestraNova = window.open("", "FinestraNova", "width=400,height=300");
    finestraNova.document.write("<h1>Estadístiques de Partides</h1>");
    finestraNova.document.write(`<p>Total de partides: ${totalPartides}</p>`);
    finestraNova.document.write(`<p>Partides guanyades (${percentatgeVictories.toFixed(2)}%): ${victories}</p>`);
    finestraNova.document.write(`<p>Partides perdudes (${percentatgeDerrotes.toFixed(2)}%): ${defeats}</p>`);
}

// Función para eliminar las estadísticas almacenadas
function eliminarEstadistiques() {
    localStorage.removeItem('victories');
    localStorage.removeItem('derrotes');
    localStorage.clear();
    mostrarAlerta("alert-success", "S'ha borrat tota la informació");
}
