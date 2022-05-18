const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Replies with bot commands'),
    async execute(interaction) {
        await interaction.reply({ content: 'https://github.com/z3n1th21/KazemiyaBot/wiki/Commands', ephemeral: true });
    },
};
