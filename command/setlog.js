const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setlog")
        .setDescription("Set the server log channel")
        .addChannelOption(o =>
            o.setName("channel")
                .setDescription("Log channel")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        const config = require("../config.json");
        config.logChannel = channel.id;

        fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));

        interaction.reply({
            content: `Log channel set to <#${channel.id}>`,
            ephemeral: true
        });
    }
};
