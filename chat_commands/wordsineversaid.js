module.exports = {
    name: 'wordsineversaid',
    async execute(client, interaction, ...args) {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const channel = client.channels.cache.get(interaction.channelId);

        // 172 BPM
        let beat = 60000 / 172;

        if (!args[0][0]) {
            // Pass
        }
        else if (String(args[0][0]).toLowerCase() === 'dt') {
            beat /= 1.5;
        }
        else if (String(args[0][0]).toLowerCase() === 'ht') {
            beat /= 0.75;
        }

        channel.send('It\'s so looouuud');
        await sleep(beat * 10);
        channel.send('inside my head');
        await sleep(beat * 8);
        channel.send('with words that I');
        await sleep(beat * 8);
        channel.send('should\'ve said');
        await sleep(beat * 6);
        channel.send('as I droooooown');
        await sleep(beat * 6);
        channel.send('in my regrets');
        await sleep(beat * 8);
        channel.send('I can\'t take back');
        await sleep(beat * 8);
        channel.send('the words I never said');
        await sleep(beat * 14);
        channel.send('never said');
        await sleep(beat * 6);
        channel.send('I can\'t take back');
        await sleep(beat * 8);
        channel.send('the words I never said');
    },
};
