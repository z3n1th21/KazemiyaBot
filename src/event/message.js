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

        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        if (!message.guild) return;
        wysi(message);
        if (!message.member) message.member = await message.guild.fetchMember(message);

        // parse content command and args
        const regex = /(?:(([^\s"']+=("[^"]*"|'[^']*'))|[^\s"']+|("[^"]*"|'[^']*')))+/g;
        // remove prefix, then split by space but keeping quoted strings intact
        const array = message.content.slice(1).toLowerCase().match(regex);
        const command_name = array.shift();
        if (command_name.length === 0) return;
        const command = client.commands.get(command_name);
        if (!command) return;
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        // map each arg to their key, or their index if no key specified
        const args = new Map();
        let associative = false;
        let positional = false;
        array.forEach((arg, index) => {
            arg = arg.replaceAll(/["']/g, '');
            const i = arg.indexOf('=');
            if (i >= 0) {
                args.set(arg.substring(0, i), arg.substring(i + 1));
                associative = true;
            } else {
                args.set(index, arg);
                positional = true;
            }
        });
        if (associative && positional) {
            await message.reply('please don\'t use both positional and associative arguments');
        }
        try {
            // may need to add `client` parameter later
            command.chat(message, args);
        } catch (error) {
            logger.error(error);
            await message.reply('there was an unknown error executing this command :(');
        }
    },
};
