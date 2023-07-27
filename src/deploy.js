const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client_id, test_guild_id, token } = require('../config.json');

// Get all commands from ./command
const commands = [];
const folders_path = path.join(__dirname, 'command');
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

if (process.argv[2] === 'global') {
    rest.put(Routes.applicationCommands(client_id), { body: commands })
        .then(() => console.log('successfully registered application commands globally'))
        .catch(console.error);
} else {
    // Deploy admin commands to test server only
    const admin_path = path.join(__dirname, 'admin');
    const admin_files = fs.readdirSync(admin_path).filter(file => file.endsWith('.js'));
    for (const file of admin_files) {
        const file_path = path.join(admin_path, file);
        const command = require(file_path);
        commands.push(command.data.toJSON());
    }
    rest.put(Routes.applicationGuildCommands(client_id, test_guild_id), { body: commands })
        .then(() => console.log('successfully registered application commands to test server'))
        .catch(console.error);
}
