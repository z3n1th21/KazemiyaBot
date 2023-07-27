module.exports = {
    slash_reply: async (interaction, msg, ephemeral) => {
        msg.replace('_', '\\_');
        interaction.reply({
            content: msg,
            ephemeral: ephemeral,
        });
    },
    chat_reply: async (client, interaction, msg) => {
        interaction.reply(msg);
    },
};
