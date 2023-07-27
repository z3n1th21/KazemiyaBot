const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_client } = require('../../utility/mongo.js');
const { lookup_user } = require('../../utility/osu.js');
const { slash_reply, chat_reply } = require('../../utility/discord.js');

const set_mongo_db = async (discord_id, osu_id) => {
    const user_settings = get_client().db('users').collection('settings');

    user_settings.updateOne(
        { _id: discord_id },
        {
            $set: { osu_id: osu_id },
        },
        { upsert: true },
    );
};

const register = async (id, user, type) => {
    let osu_user;
    try {
        osu_user = await lookup_user(user, undefined, type);
        await set_mongo_db(id, osu_user.id);
    } catch (error) {
        return error.message;
    }
    return `set osu! user as ${osu_user.username} (id ${osu_user.id})`;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('register your osu! user for this bot')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('your username or id')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('specify username or id lookup')
                .addChoices(
                    { name: 'id', value: 'id' },
                    { name: 'username', value: 'username' },
                )),
    slash: async (interaction) => {
        const user = interaction.options.getString('user');
        const type = interaction.options.getString('type');
        const id = interaction.user.id;
        const reply = await register(id, user, type);
        await slash_reply(interaction, reply, true);
    },
    chat: async (interaction, args) => {
        if (!args[0]) {
            chat_reply(interaction, 'usage: `)register [your osu! id/username (use quotes if needed)]`');
        } else {
            // if (args[1] && (args[1] !== 'username' || args[1] !== 'id')) {
            //     chat_reply(interaction, 'usage: `)register [your osu! id/username (use quotes if needed)]`');
            //     return;
            // }
            const reply = await register(interaction.author.id, args[0]);
            chat_reply(interaction, reply);
        }
    },
};
