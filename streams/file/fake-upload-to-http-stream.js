import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        // Push nesse caso do Readable é uma função indicando o que iremos retornar na stream
        // Nesse exemplo é possível ver que conseguimos acompanhar o processamento dos dados, antes mesmo de 
        // o seu carregamento por completo ser realizado, é possível trabalhar com os dados de forma parcial.
        setTimeout(() => {
            const buf = Buffer.from(String(i));
            this.push(i > 5 ? null : buf);
        }, 1000);
    }
}

fetch("http://localhost:3334", {
    method: "POST",
    body: new OneToHundredStream(),
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
});