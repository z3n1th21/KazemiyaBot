module.exports = {
    name: 'harumachiclover',
    async execute(client, interaction, ...args) {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const channel = client.channels.cache.get(interaction.channelId);

        // 142 BPM
        let beat = 60000 / 142;

        if (!args[0][0]) {
            // Pass
        }
        else if (String(args[0][0]).toLowerCase() === 'dt') {
            beat /= 1.5;
        }
        else if (String(args[0][0]).toLowerCase() === 'ht') {
            beat /= 0.75;
        }

        channel.send('me no mae no');
        await sleep(beat * 2.5);
        channel.send('tobira o aketara harukaze');
        await sleep(beat * 7.5);
        channel.send('tori tachi mo kigi de machiawase');
        await sleep(beat * 8);
        channel.send('kimi e mukau shingō wa aozora iro');
        await sleep(beat * 11.5);
        channel.send('kakedase ba ii');
        await sleep(beat * 5);
        channel.send('usotsuki kakuritsu ron toka');
        await sleep(beat * 7.5);
        channel.send('ichi purasu ichi ga mugen toka');
        await sleep(beat * 8);
        channel.send('oshiete kureta kimi to sagashi ni ikou');
        await sleep(beat * 12);
        channel.send('harumachi clover');
    },
};
