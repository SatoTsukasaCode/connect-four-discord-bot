//🟡 🔴

const { Client, IntentsBitField, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

function createButtons() {
    const right = new ButtonBuilder()
            .setCustomId('rightButton')
            .setLabel("➡️")
            .setStyle(ButtonStyle.Primary);
    const left = new ButtonBuilder()
            .setCustomId('leftButton')
            .setLabel("⬅️")
            .setStyle(ButtonStyle.Primary);
    const confirm = new ButtonBuilder()
            .setCustomId('confirmButton')
            .setLabel("🆗")
            .setStyle(ButtonStyle.Primary);

    return {
            right: right,
            confirm: confirm,
            left: left,
        };
}

module.exports = {
    createButtons,
}