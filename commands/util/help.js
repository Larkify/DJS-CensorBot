const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: `help`,
        aliases: ['info', 'tony', 'i']
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setTitle(`Tony's Information`)
            .setColor(`0xFCA95F`)
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('Made with ❤ by larkx#0001')
            .setDescription(`*There isn't actually any commands for Tony, however he still has a purpose! It's to keep **${message.guild.name}** safe and away from trouble by censoring bad words that some mean people may say. You can support the developer by checking out [his website!](https://larkx.xyz/)*`)
        message.channel.send(embed);
    }
}