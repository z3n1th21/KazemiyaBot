module.exports = {
    name: 'messageCreate',
    async execute(msgInteraction) {
        const prefix = ')';
        const client = msgInteraction.client;

        if (msgInteraction.author.bot) return;
        if (!msgInteraction.guild) return;
        if (!msgInteraction.content.startsWith(prefix)) return;
        if (!msgInteraction.member) msgInteraction.member = await msgInteraction.guild.fetchMember(msgInteraction);

        const args = msgInteraction.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command.length === 0) return;

        const chat_command = client.chat_commands.get(command);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        if (chat_command) chat_command.execute(client, msgInteraction, args);
    },
};
