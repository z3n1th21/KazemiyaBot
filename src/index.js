// require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, osu_client_id, osu_client_secret } = require('../config.json');
const { auth } = require('osu-api-extended');
const { initialize } = require('./utility/mongo.js');

// create a new Discord client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent],
});

// authenticate osu! api
auth.login(osu_client_id, osu_client_secret, ['public']);

// initialize MongoDB client (open connection)
initialize();

// get all commands from ./commands and ./admin
client.commands = new Collection();
const command_folders_path = path.join(__dirname, 'command');
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
const admin_path = path.join(__dirname, 'admin');
const admin_files = fs.readdirSync(admin_path).filter(file => file.endsWith('.js'));
for (const file of admin_files) {
    const file_path = path.join(admin_path, file);
    const command = require(file_path);
    client.commands.set(command.data.name, command);
}

// get all events from ./events
client.events = new Collection();
const events_path = path.join(__dirname, 'event');
const event_files = fs.readdirSync(events_path).filter(file => file.endsWith('.js'));
for (const file of event_files) {
    const file_path = path.join(events_path, file);
    const event = require(file_path);
    // map all supported events to handler functions
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// login to Discord with your client's token
client.login(token);
