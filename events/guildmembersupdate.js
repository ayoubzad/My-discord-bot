const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = client => {
    client.on("guildMemberUpdate", (oldM, newM) => {
        if (!config.logChannel) return;  // تأكد من أن القناة موجودة

        // تحقق من الأدوار التي تم إضافتها أو إزالتها
        const addedRoles = newM.roles.cache.filter(role => !oldM.roles.cache.has(role.id));
        const removedRoles = oldM.roles.cache.filter(role => !newM.roles.cache.has(role.id));

        // إذا تم إضافة أو إزالة دور، ننشئ سجلًا
        if (addedRoles.size > 0 || removedRoles.size > 0) {
            const log = new EmbedBuilder()
                .setTitle("🎭 Role Updated")
                .setDescription(`${newM.user.tag} role update`)
                .addFields(
                    { name: "Added Roles", value: addedRoles.map(role => role.name).join(", ") || "None" },
                    { name: "Removed Roles", value: removedRoles.map(role => role.name).join(", ") || "None" }
                )
                .setTimestamp()
                .setColor("Blue");

            // إرسال السجل إلى القناة المحددة
            const logChannel = client.channels.cache.get(config.logChannel);
            if (logChannel) {
                logChannel.send({ embeds: [log] });
            }
        }
    });
};
