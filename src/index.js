require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on("ready", (c) => { 
    console.log("Bot in online");
});

client.on('messageCreate', (message) => {
    if(message.author.bot) {
        return;
    }

    if(message.content == "start game") {
        message.reply("start game");
    }
}); 

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) {
        return;
    }

    if(interaction.commandName == "game") {
        const player_one = interaction.options.get('playerone').value;
        const player_two = interaction.options.get('playertwo').value;

        interaction.reply(player_one + " vs " + player_two);
    }
});

client.login(process.env.TOKEN)