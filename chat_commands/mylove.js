module.exports = {
    name: 'mylove',
    async execute(client, interaction, ...args) {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const channel = client.channels.cache.get(interaction.channelId);

        // 128 BPM
        let beat = 60000 / 128;

        if (!args[0][0]) {
            // Pass
        }
        else if (String(args[0][0]).toLowerCase() === 'dt') {
            beat /= 1.5;
        }
        else if (String(args[0][0]).toLowerCase() === 'ht') {
            beat /= 0.75;
        }

        channel.send('I wanna be your man');
        await sleep(beat * 4);
        channel.send('Your lover and your friend');
        await sleep(beat * 4);
        channel.send('I\'m gonna love you true');
        await sleep(beat * 4);
        channel.send('I wanna be the one who you come home to');
    },
};
