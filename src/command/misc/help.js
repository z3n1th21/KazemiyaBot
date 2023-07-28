const { SlashCommandBuilder } = require('@discordjs/builders');
const { slash_reply, chat_reply } = require('../../utility/discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('replies with bot commands'),
    slash: async (interaction) => {
        slash_reply(interaction, 'https://github.com/z3n1th21/KazemiyaBot/wiki/Commands', true);
    },
    chat: async (interaction) => {
        chat_reply(interaction, 'https://github.com/z3n1th21/KazemiyaBot/wiki/Commands');
    },
};
