module.exports = {
    name: 'messageCreate',
    async execute(msg_interaction) {
        const prefix = ')';
        const client = msg_interaction.client;

        if (msg_interaction.author.bot) return;
        if (!msg_interaction.guild) return;
        if (!msg_interaction.content.startsWith(prefix)) return;
        if (!msg_interaction.member) msg_interaction.member = await msg_interaction.guild.fetchMember(msg_interaction);

        const args = msg_interaction.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command.length === 0) return;

        const chat_command = client.chat_commands.get(command);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        if (chat_command) {
            chat_command.execute(client, msg_interaction, args);
        }
    },
};
