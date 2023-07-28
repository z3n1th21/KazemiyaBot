const logger = require('../utility/logger.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction`);

        // Handle interaction, check if it's a command
        const client = interaction.client;
        if (!interaction.isCommand()) return;

        // Try to respond to command
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.slash(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({ content: 'there was an error executing this command', ephemeral: true });
        }
    },
};
