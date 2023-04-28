const crc = (polinomio, trama) => { //La función crc toma como entrada dos parámetros: polinomio y mensaje, el polinomio es el generador utilizado para crear los bits de redundancia, mientras que el mensaje es el mensaje binario original al que se le agregarán los bits de redundancia.

    const divisor = polinomio.split("").map((bit) => parseInt(bit)) //Aquí seconvierte el polinomio divisor a un arreglo de enteros utilizando la función split para separar la cadena en caracteres individuales y la función map para convertir cada carácter a un número entero y la variable divisor contiene el arreglo de enteros resultante.
    
    let tramaBits = trama.split("").map((bit) => parseInt(bit));//Aquí se convierte el mensaje a un arreglo de enteros utilizando el mismo método que la variable divisor y la variable tramaBits contiene el arreglo de enteros resultante.
    
    let n = divisor.length - 1; // Aquí se calcula la longitud del polinomio divisor menos 1 y la almacena en la variable n. 
    
    let codigo = tramaBits.slice(); //Aquí se crea una copia del arreglo tramaBits y se almacena en la variable codigo, la función "slice()" se utiliza para copiar un arreglo en otro arreglo. En este caso, se copia el arreglo "tramaBits" en la variable "codigo". Al hacerlo de esta manera, cualquier cambio que se realice en la variable "codigo" no afectará al arreglo original "tramaBits"

    //Sabiendo que la variable "polinomio" es la que contiene el polinomio divisor, que se representa como una cadena de bits y la variable "trama" es el mensaje al que se le va a calcular el código CRC, y también se representa como una cadena de bits.

    for (let i = 0; i < n; i++) { // Aquí se agregan n ceros al final del arreglo codigo, ya que es necesario para que el algoritmo funcione correctamente.
    
        codigo.push(0);

    }
    
    //Aquí ya se realiza el cálculo del código CRC, el algoritmo se realiza utilizando dos ciclos for.
    for (let i = 0; i < tramaBits.length; i++) { //El primer ciclo itera sobre los bits del mensaje, y si el bit es un 1,
                                                 //se realiza un segundo ciclo que itera sobre los bits del polinomio divisor. 
        if (codigo[i] === 1) {                   

            for (let j = 0; j < divisor.length; j++) { //Para cada bit del polinomio divisor se realiza una operación XOR con el bit correspondiente del mensaje. 
            
                codigo[i + j] = codigo[i + j] ^ divisor[j]; // y el resultado se almacena en el arreglo "codigo".

            }
        }
    }
    
    const crc = codigo.slice(-n); //Después de que se completa el segundo ciclo, la variable crc se establece como los últimos n bits del arreglo codigo.
    
    return crc.join(""); //Finalmente, la función devuelve el código CRC como una cadena de bits utilizando la función join.

} 

function mostrarRespuesta (event){

event.preventDefault();

const tramaD = document.getElementById("trama").value;

const polinomioD = document.getElementById("polinomio").value;

const polinomio = polinomioD; // polinomio generador pasado a polinomio divisor
const trama = tramaD; //Mensaje o trama que quiere enviar el emisor

const bitsDeComprobacion = crc(polinomio, trama);

const encabezadoBitsDeInformacion = document.getElementById("encabezadoBitsDeInformacion").innerHTML = "Bits de información:";

const bitsDeInformacionD = document.getElementById("bitsDeInformacion").innerHTML = trama;

const encabezadoBitsDeComprobacion = document.getElementById("encabezadoBitsDeComprobacion").innerHTML = "Bits de comprobación:";

const bitsDeComprobacionD = document.getElementById("bitsDeComprobacion").innerHTML = bitsDeComprobacion;

const numBits = document.getElementById("numBits").innerHTML = "(" + bitsDeComprobacion.length + " bits)";

const encabezadoPalabraDeCodigo = document.getElementById("encabezadoPalabraDeCodigo").innerHTML = "Palabra de código:";

const palabraDeCodigo = document.getElementById("palabraDeCodigo").innerHTML = trama + bitsDeComprobacion;

}

const button = document.getElementById("btn");

button.addEventListener('click', mostrarRespuesta);
