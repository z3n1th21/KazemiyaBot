const { SlashCommandBuilder } = require('@discordjs/builders');
const { v2: osu } = require('osu-api-extended');
const { get_client } = require('../../mongo.js');

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

const send_reply = async (interaction, msg) => {
    msg.replace('_', '\\_');
    await interaction.reply({
        content: msg,
        ephemeral: true,
    });
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
    async execute(interaction) {
        const user = interaction.options.getString('user');
        const type = interaction.options.getString('type');
        const id = interaction.user.id;
        let osu_user;
        try {
            osu_user = await osu.user.details(user, undefined, type ?? undefined);
        } catch (error) {
            await send_reply(interaction, 'osu api error');
            return;
        }
        if (osu_user.error) {
            if (!type) {
                await send_reply(interaction, 'user not found (try specifying the type)');
                return;
            } else {
                await send_reply(interaction, 'user not found');
                return;
            }
        }
        await set_mongo_db(id, osu_user.id);
        await interaction.reply({
            content: `set osu! user as ${osu_user.username} (id ${osu_user.id})`,
            ephemeral: true,
        });
    },
};
