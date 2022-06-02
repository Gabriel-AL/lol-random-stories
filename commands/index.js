const { SlashCommandBuilder } = require('@discordjs/builders');
const { generate } = require("../reactions/generate");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lrs-generate')
        .setDescription('Generates a prompt'),

    async execute(interaction) {
        await generate(interaction);
    },
};
