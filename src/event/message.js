const logger = require('../utility/logger.js');
const regexes = [
    /7[^0-9]*2[^0-9]*7/g,
    /w(|.|..)y(|.|..)s(|.|..)i/g,
    /w(h)?(e|3)n.*u.*((s|5)(e|3)(e|3)|c).*(i|1)(t|7)/g,
    /jul.*27/g,
    /27.*jul/g,
    /klee/g,
];
const wysi = async (message) => {
    try {
        let msg = message.content.toLowerCase();
        const array = msg.split(' ');
        msg = array.filter((element) => !element.startsWith('http')).join('');
        const chars = /_|\s|_|\.\*\\~/g;
        msg = msg.replaceAll(chars, '');
        if (msg.includes('seven') && (msg.includes('twenty') || msg.includes('two'))) {
            return;
        }
        if (msg.includes('seven') && (msg.includes('twenty') || msg.includes('two'))) {
            message.react('👎');
            return;
        }
        for (const regex of regexes) {
            if (msg.match(regex)) {
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
                command.chat(message, args, client);
            } catch (error) {
                logger.error(error);
                await message.reply('there was an error executing this command');
            }
        }
    },
};
