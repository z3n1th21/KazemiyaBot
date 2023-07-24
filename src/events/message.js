// ignore unless users really need it, chat message permissions suck
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
        const command_name = args.shift().toLowerCase();

        if (command_name.length === 0) return;

        const command = client.commands.get(command_name);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));
        console.log(command);
        if (command) {
            command.chat(client, msg_interaction, args);
        }
    },
};
