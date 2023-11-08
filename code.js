function elPenjat() {
    let partidasJugadas = 0;
    let partidasGanadas = 0;
    let partidasPerdidas = 0;
    let letrasFalladas = [];
    while (true) {
        console.log("1. Iniciar un joc \n2. Estadistiques \n3. Sortir")
        let opcion = parseInt(prompt("Elige una opción"));
        if (opcion == 1) {
            let palabra = prompt("Escribe una palabra");
            let arr = Array.from(palabra);
            let str = "_ ".repeat(palabra.length);
            let intentos = 6;

            while (intentos > 0 && str.includes("_")) {
                console.log(str);
                let letra = prompt("Escribe una letra");

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
        } else if (opcion == 2) {
            console.log("Total de partidas: " + partidasJugadas);
            console.log("Partidas Ganadas: (" + ((partidasGanadas*100)/partidasJugadas) + "%): " + partidasGanadas);
            console.log("Partidas Perdidas: (" + ((partidasPerdidas*100)/partidasJugadas) + "%): " + partidasPerdidas);
        } else if (opcion == 3) {
            console.log("Juego terminado");
            break;
        }
        else {
            console.log("Valor incorrecto, vuelva a intentarlo");
        }
    }
}