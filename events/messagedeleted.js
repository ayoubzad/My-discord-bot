const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("messageDelete", msg => {
        if (!msg.guild || !config.logChannel) return;

        const log = new EmbedBuilder()
            .setTitle("🗑️ Message Deleted")
            .addFields(
                { name: "Author", value: msg.author?.tag || "??" },
                { name: "Channel", value: `${msg.channel}` },
                { name: "Content", value: msg.content || "No content" }
            )
            .setTimestamp()
            .setColor("Red");

        client.channels.cache.get(config.logChannel)?.send({ embeds: [log] });
    });
};
