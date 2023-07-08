module.exports = {
    name: 'help',
    async execute(client, interaction, ...args) {
        if (args) {
            // Pass
        }
        const channel = client.channels.cache.get(interaction.channelId);
        channel.send('https://github.com/z3n1th21/KazemiyaBot/wiki/Commands');
    },
};
