const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("guildMemberUpdate", (oldM, newM) => {
        if (!config.logChannel) return;

        if (oldM.roles.cache.size !== newM.roles.cache.size) {
            const log = new EmbedBuilder()
                .setTitle("🎭 Role Updated")
                .setDescription(`${newM.user.tag} role update`)
                .setTimestamp()
                .setColor("Blue");

            client.channels.cache.get(config.logChannel)
                ?.send({ embeds: [log] });
        }
    });
};
