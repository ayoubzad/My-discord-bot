const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("messageDelete", async msg => {
        if (!msg.guild || !config.logChannel) return;

        if (msg.partial) {
            try { msg = await msg.fetch(); }
            catch { return; }
        }

        const embed = new EmbedBuilder()
            .setTitle("🗑️ Message Deleted")
            .addFields(
                { name: "Author", value: msg.author?.tag || "Unknown" },
                { name: "Channel", value: `${msg.channel}` },
                { name: "Content", value: msg.content || "No content" }
            )
            .setColor("Red")
            .setTimestamp();

        const logChannel = client.channels.cache.get(config.logChannel);
        if (logChannel) logChannel.send({ embeds: [embed] });
    });
};
