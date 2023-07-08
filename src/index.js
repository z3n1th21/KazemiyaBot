// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, osu_client_id, osu_client_secret } = require('../config.json');
const { auth } = require('osu-api-extended');
const { initialize } = require('./mongo.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Authenticate osu! API
auth.login(osu_client_id, osu_client_secret, ['public']);

// Initialize MongoDB Client (open connection)
initialize();

// Get all slash commands from ./commands
client.commands = new Collection();
const command_folders_path = path.join(__dirname, 'commands');
const command_folders = fs.readdirSync(command_folders_path);

for (const folder of command_folders) {
    const commandsPath = path.join(command_folders_path, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const file_path = path.join(commandsPath, file);
        const command = require(file_path);
        client.commands.set(command.data.name, command);
    }
}

// Get all chat commands from ./chat_commands
client.chat_commands = new Collection();
const chat_commands_folders_path = path.join(__dirname, 'chat_commands');
const chat_command_folders = fs.readdirSync(chat_commands_folders_path);

for (const folder of chat_command_folders) {
    const chat_commands_path = path.join(chat_commands_folders_path, folder);
    const chat_command_files = fs.readdirSync(chat_commands_path).filter(file => file.endsWith('.js'));
    for (const file of chat_command_files) {
        const file_path = path.join(chat_commands_path, file);
        const chat_command = require(file_path);
        client.chat_commands.set(chat_command.name, chat_command);
    }
}


// Get all events from ./events
client.events = new Collection();
const events_path = path.join(__dirname, 'events');
const event_files = fs.readdirSync(events_path).filter(file => file.endsWith('.js'));

for (const file of event_files) {
    const file_path = path.join(events_path, file);
    const event = require(file_path);
    // Map all supported events to handler functions
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(token);
