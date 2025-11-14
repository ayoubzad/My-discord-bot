const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ship")
        .setDescription("Ship two users")
        .addUserOption(o => o.setName("user1").setDescription("First user").setRequired(true))
        .addUserOption(o => o.setName("user2").setDescription("Second user").setRequired(true)),

    async execute(interaction) {
        const u1 = interaction.options.getUser("user1");
        const u2 = interaction.options.getUser("user2");

        let percent = Math.floor(Math.random() * 100);

        let bar = "█".repeat(percent / 10) + "░".repeat(10 - percent / 10);

        let text =
            percent > 80 ? "❤️ Perfect Love!" :
            percent > 60 ? "💘 Great chemistry!" :
            percent > 40 ? "✨ Not bad!" :
            percent > 20 ? "🙂 Maybe..." :
            "💔 No chance…";

        const embed = new EmbedBuilder()
            .setTitle("💞 Love Match!")
            .setDescription(`${u1} ❤️ ${u2}`)
            .addFields(
                { name: "Compatibility", value: `${percent}%` },
                { name: "Progress", value: bar },
                { name: "Comment", value: text }
            )
            .setThumbnail(u1.displayAvatarURL())
            .setImage(u2.displayAvatarURL())
            .setColor("Pink")
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
