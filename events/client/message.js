const { Discord, MessageEmbed } = require("discord.js");
const { fs } = require('fs');
const config = require('../../config.js');

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(commandfile) commandfile.run(bot, message, args);
}