const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Send a DM to all members / a role / or specific user")
        .addStringOption(opt =>
            opt.setName("message")
                .setDescription("Message to send")
                .setRequired(true)
        )
        .addRoleOption(opt =>
            opt.setName("role")
                .setDescription("Send DM to a specific role")
                .setRequired(false)
        )
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("Send DM to a specific user")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const msg = interaction.options.getString("message");
        const role = interaction.options.getRole("role");
        const user = interaction.options.getUser("user");

        let targets = [];

        if (user) targets.push(user);
        else if (role) targets = role.members.map(m => m.user);
        else targets = interaction.guild.members.cache.map(m => m.user);

        let success = [];
        let failed = [];

        for (const member of targets) {
            try {
                await member.send(msg);
                success.push(member.tag);
            } catch {
                failed.push(member.tag);
            }
        }

        const result = new EmbedBuilder()
            .setTitle("📨 DM Broadcast Completed")
            .addFields(
                { name: "Successfully sent:", value: `${success.length}` },
                { name: "Failed:", value: `${failed.length}` },
            )
            .setTimestamp()
            .setColor("Green");

        await interaction.reply({ embeds: [result], ephemeral: true });

        // صاحب البوت يستقبل تقارير كل إرسال
        const owner = await interaction.client.users.fetch(interaction.client.application.owner.id);
        owner.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle("📬 DM Sent by admin")
                    .setDescription(`**Admin:** ${interaction.user.tag}\n**Message:** ${msg}`)
                    .setTimestamp()
                    .setColor("Blue")
            ]
        });
    }
};
