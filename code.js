function elPenjat() {
    console.log("1. Iniciar un joc"
        +"2. Estadistiques"
        +"3. Sortir")
    let opcion = parseInt(prompt("Elige una opción"));
    switch (opcion){
        case 1:
            let palabra = prompt("Escribe una palabra")
            let longitudString = 0;
            while(longitudString < palabra.length){
                longitudString++;
            }
            let str = "_ ";
            str.repeat(longitudString);
            for(let i = 0; i <= 6; i++){
                let letra = prompt("Escribe una Letra");
                if(letra.length === 1){
                    for(let x = 0; x < letra.length; x++){
                        let comparaLetra = palabra[x];
                        if(comparaLetra === letra){
                            
                        }
                    }
                }else{
                    console.log("Incorrecto");
                }
            }
    }
    
  //  alert(str.repeat(longitudString));
}