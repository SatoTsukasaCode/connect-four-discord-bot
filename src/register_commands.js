require("dotenv").config();
const { REST, Routes, SlashCommandBuilder, ApplicationCommandOptionBase, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("game")
        .setDescription("Start Connect Four")
        .addMentionableOption(option => 
            option.setName("playerone")
            .setDescription("Player one for the game")
            .setRequired(true)
        )
        .addMentionableOption(option => 
            option.setName("playertwo")
            .setDescription("Player two for the game")
            .setRequired(true)
        )
].map(command => command.toJSON());

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    console.log("registring slash commands");

    try {
        await rest.put(
            Routes.applicationGuildCommands(
              process.env.CLIENT_ID,
              process.env.GUILD_ID
            ),
            { body: commands }
          );

        console.log("slash commands registred");
    } catch(error) {
        console.log(error);
    }
})();
