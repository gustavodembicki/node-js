/**
 * Ler/Interpretar partes dos dados antes de sua leitura completada.
 * Permitindo que arquivos extensos sejam visualizados/percorridos/trabalhados pela aplicação
 * de forma geral mais rapidamente, de forma leve e performática
 */

// Streams -> 
import { stdin, stdout } from "node:process";

// stdin.pipe(stdout);

//Streams use example - Leitura
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
            this.push(i > 100 ? null : buf);
        }, 1000);
    }
}

// new OneToHundredStream().pipe(stdout);

//Streams use example - Escrita
import { Writable } from "node:stream";

class MultiplyByTenStream extends Writable {
    /**
     * Streams Writable apenas processam os dados e não os transformam
     * @param {*} chunk Pedaço que foi lido da string de leitura
     * @param {*} encoding Como a informação está codificada
     * @param {*} callback Função chamada quando a operação é finalizada
     */
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

// new OneToHundredStream().pipe(new MultiplyByTenStream());

//Streams use example - Transformação
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
    /**
     * Streams Writable apenas processam os dados e não os transformam
     * @param {*} chunk Pedaço que foi lido da string de leitura
     * @param {*} encoding Como a informação está codificada
     * @param {*} callback Função chamada quando a operação é finalizada
     */
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        /**
         * Primeiro parâmetro é o erro caso precise ser trabalhado
         * Segunda parâmetro é o valor do chunk transformado
         */
        callback(null, Buffer.from(String(transformed)));
    }
}

/**
 * A stream de leitura, somente lê as informações
 * A stream de escrita, consegue somente escrever as informações
 * A stream de transformação, precisa sempre vir entre a leitura/escrita, pois a transformação dos dados lidos, precisam ser alterados antes da sua escrita
 */
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());

/**
 * O que é o buffer ? 
 * 
 * Ele é responsável pelo transacionamento de dados entre as streams, afim de não ter que repassar
 * na comunicação entre as streams o valor original dos dados
 */