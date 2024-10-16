require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const  { createButtons } =  require('./game.js')    ;

const EMPTY_ROW = ":record_button: ".repeat(7).slice(0, -1);

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
        const player_one = interaction.options.getMember('playerone');
        const player_two = interaction.options.getMember('playertwo');

        if(player_one == player_two) {
            interaction.reply("Cannot play with yourself.");
            return;
        }

        const game_buttons = createButtons();

        const embed = new EmbedBuilder()
            .setTitle("Connect Four")
            .setDescription("A Game of Connect Four")
            //Yellow
            .setColor(0xcced13)
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW })
            .addFields({ name: " ", value: EMPTY_ROW });

        const buttons = new ActionRowBuilder()
            .addComponents(game_buttons.left, game_buttons.confirm, game_buttons.right);
        

        interaction.reply({ 
            content: `${player_one.user.globalName} vs ${player_two.globalName}`,
            embeds: [embed],
            components: [buttons]
         });
    }
    
    console.log(interaction);

    if(interaction.customId == "rightButton" || interaction.customId === "leftButton" || interaction.customId === "confrimButton") {
        console.log("Button interaction");
    }
});

client.login(process.env.TOKEN)