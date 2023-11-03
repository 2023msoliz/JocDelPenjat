function elPenjat() {
    console.log("1. Iniciar un joc \n2. Estadistiques \n3. Sortir")
    let opcion = parseInt(prompt("Elige una opción"));
    switch (opcion) {
        case 1:
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
                        console.log("Incorrecto. Te quedan " + intentos + " intentos.");
                    }
                } else {
                    console.log("Entrada incorrecta. Introduce una sola letra.");
                }
            }

            if (!str.includes("_")) {
                console.log("¡Has ganado! La palabra es: " + palabra);
            } else {
                console.log("¡Has perdido! La palabra era: " + palabra);
            }

        case 2:

        case 3:
            console.log("Juego terminado");
            break;
    }

    //  alert(str.repeat(longitudString));
}