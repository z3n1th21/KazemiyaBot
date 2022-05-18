// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Get all slash commands from ./commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Get all chat commands from ./chat_commands
client.chat_commands = new Collection();
const chatcommandsPath = path.join(__dirname, 'chat_commands');
const chatcommandFiles = fs.readdirSync(chatcommandsPath).filter(file => file.endsWith('.js'));

for (const file of chatcommandFiles) {
    const filePath = path.join(chatcommandsPath, file);
    const chatcommand = require(filePath);
    client.chat_commands.set(chatcommand.name, chatcommand);
}

// Get all events from ./events
client.events = new Collection();
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    // Map all supported events to handler functions
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(token);
