const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with bot info!'),
    async execute(interaction) {
        await interaction.reply({ content: 'Most useless osu! bot: https://github.com/z3n1th21/KazemiyaBot/wiki', ephemeral: true });
    },
};
