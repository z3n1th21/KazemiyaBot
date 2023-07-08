const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client_id, test_guild_id, token } = require('../config.json');

// Get all commands from ./commands
const commands = [];
const folders_path = path.join(__dirname, 'commands');
const folders = fs.readdirSync(folders_path);

for (const folder of folders) {
    const commands_path = path.join(folders_path, folder);
    const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));
    for (const file of command_files) {
        const file_path = path.join(commands_path, file);
        const command = require(file_path);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '9' }).setToken(token);

if (process.argv[2] === 'push') {
    rest.put(Routes.applicationCommands(client_id), { body: commands })
        .then(() => console.log('Successfully registered application commands globally.'))
        .catch(console.error);
} else {
    rest.put(Routes.applicationGuildCommands(client_id, test_guild_id), { body: commands })
        .then(() => console.log('Successfully registered application commands to test server.'))
        .catch(console.error);
}
