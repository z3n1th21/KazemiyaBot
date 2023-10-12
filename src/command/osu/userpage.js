const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_user } = require('../../utility/mongo.js');
const { lookup_user } = require('../../utility/osu.js');
const { slash_reply, chat_reply } = require('../../utility/discord.js');

const check_userpage = (userpage) => {
    const links = [];
    const message = [
        'Rumor has it Discord CDN links will not be available off Discord soon:',
        '<https://old.reddit.com/r/DataHoarder/comments/16zs1gt/cdndiscordapp_links_will_expire_breaking/>',
    ];
    const regex_discord = /(media|cdn).discordapp.(com|net)[^\\[\]?\s]*/gi;
    let result;
    while ((result = regex_discord.exec(userpage))) {
        links.push(result[0]);
    }
    if (links) {
        message.push(`You have ${links.length} Discord CDN links in your userpage:`);
        message.push('```');
        for (const link of links) {
            message.push(`https://${link}`);
        }
        message.push('```');
        message.push('Prepare to save/reupload them!');
    } else {
        message.push('You have no Discord CDN links in your userpage!');
    }
    return message.join('\n');
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-userpage')
        .setDescription('check for discord CDN links in your userpage')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('your username or id')),
    slash: async (interaction) => {
        const id = interaction.user.id;
        let osu_user;
        const user = interaction.options.getString('user');
        try {
            if (user) {
                osu_user = await lookup_user(user);
            } else {
                osu_user = await lookup_user((await get_user(id)).osu_id, undefined, 'id');
            }
        } catch (error) {
            slash_reply(interaction, error.message, true);
            return;
        }
        const userpage = osu_user.page.raw;
        interaction.deferReply({ ephemeral: true });
        const reply = check_userpage(userpage);
        slash_reply(interaction, reply, true);
    },
    chat: async (interaction, args) => {
        let osu_user;
        const user = args[0];
        try {
            if (user) {
                osu_user = await lookup_user(user);
            } else {
                osu_user = await lookup_user((await get_user(interaction.author.id)).osu_id, undefined, 'id');
            }
        } catch (error) {
            chat_reply(interaction, error.message);
            return;
        }
        const userpage = osu_user.page.raw;
        const reply = check_userpage(userpage);
        chat_reply(interaction, reply);
    },
};
