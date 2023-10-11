const logger = require('../utility/logger.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const prefix = ')';
        const client = message.client;

        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        if (!message.guild) return;
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
            arg.replaceAll(/"|'/g, '');
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
