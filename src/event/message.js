const logger = require('../utility/logger.js');
const words = [
    'wysi',
    '727',
    'wyfsi',
    '7/27',
    '7:27',
    'when you see it',
    'when you fucking see it',
    'july 27',
    'klee',
];
const wysi = async (message) => {
    const msg = message.content.toLowerCase();
    try {
        for (const word of words) {
            if (msg.includes(word)) {
                message.react('👎');
                return;
            }
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const prefix = ')';
        const client = message.client;

        if (message.author.bot) return;
        if (!message.guild) return;
        wysi(message);
        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        // remove prefix, then split by space but keeping quoted strings intact, then remove quotes
        const regex = /(?:[^\s"']+|("|')[^"']*("|'))+/g;
        const args = message.content.slice(prefix.length).trim().toLowerCase().match(regex);
        for (let i = 0; i < args.length; i++) {
            args[i] = args[i].replaceAll(/'|"/g, '');
        }

        // retrieve command
        const command_name = args.shift();
        if (command_name.length === 0) return;
        const command = client.commands.get(command_name);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        if (command) {
            try {
                command.chat(client, message, args);
            } catch (error) {
                logger.error(error);
                await message.reply('there was an error executing this command');
            }
        }
    },
};
