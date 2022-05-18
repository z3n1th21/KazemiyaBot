const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('727')
		.setDescription('Replies with WYSI!'),
	async execute(interaction) {
		await interaction.reply('WYSI');
	},
};
