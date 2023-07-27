const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const logger = require('../utility/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('reload a file')
        .addStringOption(option =>
            option.setName('filepath')
                .setDescription('format: "folder/filepath" (don\'t include .js)')
                .setRequired(true)),
    slash: async (interaction) => {
        let filepath = interaction.options.getString('filepath', true).toLowerCase();
        const array = filepath.split('/');
        filepath = path.join(__dirname, '..', ...array);

        // check if file exists
        if (!fs.existsSync(`${filepath}.js`)) {
            interaction.reply(`there is no file at path \`${filepath}\``, true);
            return;
        }

        // delete file from cache
        delete require.cache[require.resolve(filepath)];
        const reloaded = require(filepath);

        // if reloaded file was a command handler, reload command in client
        if (array[0] !== 'command') {
            interaction.reply(`file at \`${filepath}\` was reloaded`);
        } else {
            const commandName = array[array.length - 1];
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply(`there is no command with name \`${commandName}\`!`, true);
            }

            try {
                interaction.client.commands.delete(command.data.name);
                interaction.client.commands.set(reloaded.data.name, reloaded);
                interaction.reply(`command \`${reloaded.data.name}\` was reloaded!`, true);
            } catch (error) {
                logger.error(error);
                interaction.reply(`there was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``, true);
            }
        }
    },
};
