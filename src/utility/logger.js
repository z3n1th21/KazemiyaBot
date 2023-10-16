const pino = require('pino');
const transport = pino(pino.transport({
    target: 'pino-pretty',
    options: {
        destination: './pino.log',
    },
}));
module.exports = pino(transport);