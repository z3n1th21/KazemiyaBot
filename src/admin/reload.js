const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('reload a command')
        .addStringOption(option =>
            option.setName('filepath')
                .setDescription('format: "folder/filepath" (don\'t include .js)')
                .setRequired(true)),
    slash: async (interaction) => {
        const filepath = interaction.options.getString('filepath', true).toLowerCase();
        const array = filepath.split('/');
        const commandName = array[array.length - 1];
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(`there is no command with name \`${commandName}\`!`);
        }

        delete require.cache[require.resolve(`../commands/${filepath}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(`../commands/${filepath}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`there was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }

    },
};
