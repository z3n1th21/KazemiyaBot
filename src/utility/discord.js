module.exports = {
    slash_reply: async (interaction, msg, ephemeral) => {
        msg.replace('_', '\\_');
        interaction.reply({
            content: msg,
            ephemeral: ephemeral,
        });
    },
    chat_reply: async (interaction, msg) => {
        interaction.reply({
            content: msg,
            allowedMentions: { repliedUser: false },
        });
    },
};
