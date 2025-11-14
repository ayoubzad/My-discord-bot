const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("userUpdate", (oldU, newU) => {
        if (!config.logChannel) return;

        if (oldU.username !== newU.username) {
            const log = new EmbedBuilder()
                .setTitle("📝 Username Changed")
                .addFields(
                    { name: "Old", value: oldU.username },
                    { name: "New", value: newU.username }
                )
                .setColor("Yellow")
                .setTimestamp();

            client.channels.cache.get(config.logChannel)
                ?.send({ embeds: [log] });
        }
    });
};
