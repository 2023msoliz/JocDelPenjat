
let partidasJugadas = 0;
let partidasGanadas = 0;
let partidasPerdidas = 0;
let letrasFalladas = [];

let letrasUtilizadasDiv = document.getElementById("lletresUtilitzades");
let letrasUtilizadas = [];

const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let abecedariDiv = document.getElementById("abecedari");
let bloqueAbecedari = "";
for (let i = 0; i < abecedario.length; i++) {
    let letra = abecedario[i];
    bloqueAbecedari += `<button id="${letra}" onclick="comprobarLetra('${letra}')" class="btn btn-light m-2" style="border-radius: 5px; border: 1px solid black; border-color: gray; color: gray;">${abecedario[i]}</button>`;
}
abecedariDiv.innerHTML = bloqueAbecedari;



function novaPartida() {
    let palabra = prompt("Escribe una palabra");
    let arr = Array.from(palabra);
    let str = "_ ".repeat(palabra.length);
    let intentos = 6;

    while (intentos > 0 && str.includes("_")) {
        console.log(str);
        if (letra.length < 2 && letra.match(/[a-zA-Z]/)) {
            let encontrada = false;

            for (let x = 0; x < arr.length; x++) {
                if (arr[x] === letra) {
                    str = str.substring(0, 2 * x) + letra + str.substring(2 * x + 1);
                    encontrada = true;
                }
            }

            if (!encontrada) {
                intentos--;
                letrasFalladas.push(letra);
                console.log("Letras falladas " + intentos + "/6: " + letrasFalladas.join(", "));
            }
        } else {
            console.log("Entrada incorrecta. Introduce una sola letra.");
        }
    }

    if (!str.includes("_")) {
        partidasJugadas++;
        partidasGanadas++;
        console.log("¡Has ganado! La palabra es: " + palabra);
    } else {
        partidasJugadas++;
        partidasPerdidas++;
        console.log("¡Has perdido! La palabra era: " + palabra);
    }
}

function estadisticas() {
    console.log("Total de partidas: " + partidasJugadas);
    console.log("Partidas Ganadas: (" + ((partidasGanadas * 100) / partidasJugadas) + "%): " + partidasGanadas);
    console.log("Partidas Perdidas: (" + ((partidasPerdidas * 100) / partidasJugadas) + "%): " + partidasPerdidas);
}