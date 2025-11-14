const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("guildMemberUpdate", (oldM, newM) => {
        if (!config.logChannel) return;

        if (oldM.roles.cache.size !== newM.roles.cache.size) {
            const embed = new EmbedBuilder()
                .setTitle("🎭 Role Updated")
                .setDescription(`${newM.user.tag} role update`)
                .setColor("Blue")
                .setTimestamp();

            const ch = client.channels.cache.get(config.logChannel);
            if (ch) ch.send({ embeds: [embed] });
        }
    });
};
