require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: 'Start Game',
        description: "Start Connect Four",
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    console.log("registring slash commands");

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log("slash commands registred");
    } catch(error) {
        console.log(error);
    }
})();
