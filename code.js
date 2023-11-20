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

const jocPenjat = document.getElementById("jocPenjat");
const botonsAbecedari = document.getElementById("abecedari");
const imatgePenjat = document.getElementById("imatgePenjat");
const lletresUtilitzadesContenedor = document.getElementById("lletresUtilitzades");
const contenedorAlerta = document.getElementById("alertContainer");

function novaPartida() {
    totalPartides++;
    paraulaSecreta = prompt("Introdueix la paraula secreta").toLowerCase();
    mostrarAbecedari();
    mostrarParaulaSecreta();
}



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

function actualizarInterfície() {
    mostrarLletresUtilitzades();
    mostrarImatgePenjat();
    actualizarParaulaMostrada();
    verificarResultat();
}

function mostrarAbecedari() {
    const abecedari = 'abcdefghijklmnopqrstuvwxyz';
    for (let lletra of abecedari) {
        const boto = document.createElement("button");
        configurarBotoAbecedari(boto, lletra);
        botonsAbecedari.appendChild(boto);
    }
}

function configurarBotoAbecedari(boto, lletra) {
    boto.classList.add("btn", "btn-outline-dark", "m-2");
    boto.textContent = lletra.toUpperCase();
    boto.addEventListener("click", function () {
        gestionarClickLletra(lletra);
    });
}

function mostrarImatgePenjat() {
    const contenedorImatge = document.getElementById("imatgePenjatContainer");
    const indexImatge = (intentsRestants === maxIntents) ? maxIntents : intentsRestants;
    contenedorImatge.innerHTML = `<img src="${imatgesPenjat[indexImatge]}" style="max-width: 100%; height: auto;" />`;
}

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

function reiniciarElementHTML(element, nouSrc = "") {
    if (element) {
        if (element.src) {
            element.src = nouSrc;
        }
        element.innerHTML = "";
    }
}

function mostrarLletresUtilitzades() {
    const contenedorLletresUtilitzades = document.getElementById("cajonLletresUtilitzades");
    contenedorLletresUtilitzades.innerHTML = "";
    for (let lletra of lletresUtilitzades) {
        let boto = document.createElement("button");
        configurarBotoLletresUtilitzades(boto, lletra);
        contenedorLletresUtilitzades.appendChild(boto);
    };
}

function configurarBotoLletresUtilitzades(boto, lletra) {
    boto.textContent = lletra.toUpperCase();
    if (paraulaSecreta.includes(lletra)) {
        boto.classList.add("btn", "btn-success", "m-2");
    } else {
        boto.classList.add("btn", "btn-danger", "m-2");
    }
}

function mostrarParaulaSecreta() {
    for (let index = 0; index < paraulaSecreta.length; index++) {
        const span = document.createElement("span");
        configurarSpanParaulaOculta(span);
        jocPenjat.appendChild(span);
    }
}

function configurarSpanParaulaOculta(span) {
    span.classList.add("badge", "rounded-pill", "bg-light", "text-dark");
    span.style.fontSize = "2rem";
    span.style.margin = "1rem";
    span.textContent = "_";
}

function actualizarParaulaMostrada() {
    paraulaMostrada = "";
    jocPenjat.innerHTML = "";
    for (let lletra of paraulaSecreta) {
        let span = document.createElement("span");
        configurarSpanParaulaMostrada(span, lletra);
        jocPenjat.appendChild(span);
    }
}

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

function mostrarAlerta(classe, missatge) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", classe);
    alerta.textContent = missatge;
    contenedorAlerta.appendChild(alerta);
    setTimeout(() => {
        contenedorAlerta.removeChild(alerta);
    }, 10000);
}

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

function emmagatzemarEstadistiques() {
    localStorage.setItem('victories', victories);
    localStorage.setItem('derrotes', defeats);
}

function mostrarEstadisticas() {
    victories = localStorage.getItem('victories') || 0;
    defeats = localStorage.getItem('derrotes') || 0;
    const totalPartidas = victories + defeats;
    const percentatgeVictories = (victories / totalPartidas) * 100;
    const percentatgeDerrotes = (defeats / totalPartidas) * 100;

    const finestraNova = window.open("", "FinestraNova", "width=400,height=300");
    finestraNova.document.write("<h1>Estadístiques de Partides</h1>");
    finestraNova.document.write(`<p>Total de partides: ${totalPartidas}</p>`);
    finestraNova.document.write(`<p>Partides guanyades (${percentatgeVictories.toFixed(2)}%): ${victories}</p>`);
    finestraNova.document.write(`<p>Partides perdudes (${percentatgeDerrotes.toFixed(2)}%): ${defeats}</p>`);
}


function eliminarEstadistiques() {
    localStorage.removeItem('victories');
    localStorage.removeItem('derrotes');
    localStorage.clear();
    mostrarAlerta("alert-success", "S'ha borrat tota la informació");
}
