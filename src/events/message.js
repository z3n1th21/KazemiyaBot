const words = [
    'wysi',
    '727',
    'wyfsi',
    '7/27',
    '7:27',
    'when you see it',
    'when you fucking see it',
    'july 27',
];
const wysi = async (client, msg_interaction) => {
    const msg = msg_interaction.content.toLowerCase();
    try {
        for (const word of words) {
            if (msg.includes(word)) {
                msg_interaction.react('👎');
                return;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    name: 'messageCreate',
    async execute(msg_interaction) {
        const prefix = ')';
        const client = msg_interaction.client;

        wysi(client, msg_interaction);

        if (msg_interaction.author.bot) return;
        if (!msg_interaction.guild) return;
        if (!msg_interaction.content.startsWith(prefix)) return;
        if (!msg_interaction.member) msg_interaction.member = await msg_interaction.guild.fetchMember(msg_interaction);

        const args = msg_interaction.content.slice(prefix.length).trim().split(/ +/g);
        const command_name = args.shift().toLowerCase();

        if (command_name.length === 0) return;

        const command = client.commands.get(command_name);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        if (command) {
            command.chat(client, msg_interaction, args);
        }
    },
};
