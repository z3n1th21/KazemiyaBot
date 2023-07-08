module.exports = {
    name: 'admin',
    async execute(client, interaction, ...args) {
        const channel = client.channels.cache.get(interaction.channelId);

        if (interaction.author.id !== '258741232774152212') {
            channel.send('You don\'t have permission for this.');
            return;
        }

        if (!args[0][0]) {
            channel.send('This channel: ' + channel);
        }
        else if (String(args[0][0]).toLowerCase() === 'kill') {
            process.kill(process.pid, 'SIGINT');
            process.kill(process.pid, 'SIGKILL');
        }
    },
};
