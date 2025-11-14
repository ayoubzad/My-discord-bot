const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("messageUpdate", (oldMsg, newMsg) => {
        if (!newMsg.guild || !config.logChannel) return;

        const log = new EmbedBuilder()
            .setTitle("✏️ Message Edited")
            .addFields(
                { name: "Author", value: newMsg.author?.tag || "??" },
                { name: "Channel", value: `${newMsg.channel}` },
                { name: "Before", value: oldMsg.content || "Empty" },
                { name: "After", value: newMsg.content || "Empty" }
            )
            .setTimestamp()
            .setColor("Orange");

        client.channels.cache.get(config.logChannel)?.send({ embeds: [log] });
    });
};
