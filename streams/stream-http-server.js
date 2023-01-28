import http from "node:http";
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

        console.log(transformed);
        
        /**
         * Primeiro parâmetro é o erro caso precise ser trabalhado
         * Segunda parâmetro é o valor do chunk transformado
         */
        callback(null, Buffer.from(String(transformed)));
    }
}

/**
 * request => Readable Stream
 * response => Writable Stream
 */
const server = http.createServer(async (request, response) => {
    const buffers = [];

    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return response.end(fullStreamContent);

    // return request
    //     .pipe(new InverseNumberStream())
    //     .pipe(response);
});

server.listen(3334);