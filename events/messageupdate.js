const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("messageUpdate", async (oldMsg, newMsg) => {
        // تجاهل رسائل DM أو بدون قناة
        if (!newMsg.guild || !config.logChannel) return;

        // إذا كانت الرسالة ناقصة (partial)، نحاول نكملها
        if (oldMsg.partial) {
            try {
                oldMsg = await oldMsg.fetch();
            } catch {
                return; // إذا فشل، لا نسجل شيء
            }
        }

        if (newMsg.partial) {
            try {
                newMsg = await newMsg.fetch();
            } catch {
                return;
            }
        }

        // تجاهل إذا المحتوى ما تغير
        if (oldMsg.content === newMsg.content) return;

        const embed = new EmbedBuilder()
            .setTitle("✏️ Message Edited")
            .addFields(
                { name: "Author", value: newMsg.author?.tag || "Unknown" },
                { name: "Channel", value: `${newMsg.channel}` },
                { name: "Before", value: oldMsg.content || "Empty" },
                { name: "After", value: newMsg.content || "Empty" }
            )
            .setColor("Orange")
            .setTimestamp();

        const logChannel = client.channels.cache.get(config.logChannel);
        if (logChannel) logChannel.send({ embeds: [embed] });
    });
};
