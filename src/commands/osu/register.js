const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_client } = require('../../utility/mongo.js');
const { lookup_user } = require('../../utility/osu.js');
const { slash_reply } = require('../../utility/discord.js');

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

const register = async (interaction, user, type, id) => {
    let osu_user;
    try {
        osu_user = await lookup_user(user, undefined, type);
    } catch (error) {
        await slash_reply(interaction, error.message, true);
        return;
    }
    console.log(osu_user);
    await set_mongo_db(id, osu_user.id);
    await slash_reply(interaction, `set osu! user as ${osu_user.username} (id ${osu_user.id})`, true);
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('register/clear your osu! user for this bot')
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
        console.log(`${user} ${type} ${id}`);
        await register(interaction, user, type, id);
    },
};
