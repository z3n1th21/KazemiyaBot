module.exports = {
    name: 'admin',
    async execute(client, interaction, ...args) {
        const channel = client.channels.cache.get(interaction.channelId);

        console.log(interaction.author);
        if (interaction.author.id !== '258741232774152212') {
            channel.send('You don\'t have permission for this.');
            return;
        }

        if (!args[0][0]) {
            channel.send('This channel: ' + channel);
        }
        else if (String(args[0][0]).toLowerCase() === 'sigint') {
            process.kill(process.pid, 'SIGINT');
        }
        else if (String(args[0][0]).toLowerCase() === 'sigterm') {
            process.kill(process.pid, 'SIGTERM');
        }
        else if (String(args[0][0]).toLowerCase() === 'sigkill') {
            process.kill(process.pid, 'SIGKILL');
        }
    },
};
