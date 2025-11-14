const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel]
});

client.commands = new Collection();

// Load commands
fs.readdirSync("./commands").forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

// Load events
fs.readdirSync("./events").forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
});

client.login(config.token);
