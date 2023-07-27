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

        const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/g);
        const command_name = args.shift();

        if (command_name.length === 0) return;

        const command = client.commands.get(command_name);
        // if (!chat_command) chat_command = client.commands.get(client.aliases.get(command));

        if (command) {
            command.chat(client, message, args);
        }
    },
};
