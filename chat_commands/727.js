module.exports = {
    name: '727',
    async execute(client, interaction, ...args) {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const channel = client.channels.cache.get(interaction.channelId);

        let speed = 1.0;
        if (!args[0][0]) {
            // Pass
        }
        else if (String(args[0][0]).toLowerCase() === 'dt') {
            speed = 1.5;
        }
        else if (String(args[0][0]).toLowerCase() === 'ht') {
            speed = 0.75;
        }

        // hardcoded timing due to not being a song
        channel.send('STOP POSTING ABOUT 727! I\'M TIRED OF SEEING IT!');
        await sleep(2500 / speed);
        channel.send('THE NPCs ON OSUGAME POST 727 MEMES, IN TWITCH CHAT IT\'S FUCKING WYSI EMOTES!');
        await sleep(2500 / speed);
        channel.send('I was in a multi lobby, right? and ALL OF THE PLAYERS were just spamming !roll 727.');
        await sleep(3000 / speed);
        channel.send('I-I showed my osu!thighhighs to my pippi dakimakura and t-the pricetag I tapped it and I said:');
        await sleep(2000 / speed);
        channel.send('"hey babe, WHEN YOU SEE IT, HAHA! DUU DUUUUUUU, DU DU DU DUU DUUUU"');
        await sleep(4000 / speed);
        channel.send('I fucking saw someone point with their index finger and said "AIREU 727 WHEN YOU FUCKING SEE IT!"');
        await sleep(2500 / speed);
        channel.send('I looked at my penis I think of a Wacom pen and I go:');
        await sleep(1000 / speed);
        channel.send('"PENIS? MORE LIKE BLUE ZENITH" AAAAAAAAAAAAAAAAAAAAAAAA');
    },
};
