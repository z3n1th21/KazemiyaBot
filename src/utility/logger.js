const pino = require('pino');
const logger = pino(pino.transport({
    target: 'pino/file',
    options: {
        destination: './out.log',
    },
}));
module.exports = logger;