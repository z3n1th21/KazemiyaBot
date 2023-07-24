const { SlashCommandBuilder } = require('discord.js');
const { disconnect } = require('../utility/mongo.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('kills process'),
    slash: async (interaction) => {
        disconnect();
        interaction.reply({ content: 'ending process', ephemeral: true });
        process.kill(process.pid, 'SIGINT');
        process.kill(process.pid, 'SIGKILL');
    },
};
