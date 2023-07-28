const logger = require('../utility/logger.js');
module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const prefix = ')';
        const client = message.client;

        if (message.author.bot) return;
        if (!message.guild) return;
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
