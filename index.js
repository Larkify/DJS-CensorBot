const { Client, Collection, MessageEmbed } = require('discord.js');
const config = require('./config');
const moment = require('moment');

let bot = new Client ({
  presence: {
      status: `${config.status_activity}`,
      activity: {
          name: `${config.status_text}`,
          type: `${config.status_type}`
      }
  }
});

[`aliases`, `commands`].forEach(x => bot[x] = new Collection());
["command", "events"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('message', message => {
    if (message.author.bot) return;
    if (config.banned_words.some(word => message.content.toLowerCase().includes(word))){
      message.delete()
      message.channel.send(`**${message.author.tag}** said a blacklisted phrase`)
      
      let mtext = message.content
      let mauthor = message.author
      let mauthortag = message.author.tag
      let mauthorid = message.author.id
      let mchannel = message.channel
      let mlink = message.url
      let mtime = message.createdTimestamp
      let mid = message.id
      let guildname = message.guild.name
    
      let embed = new MessageEmbed()
        .setTitle('Level 3 | Banned Phrase')
        .setColor('0xFF1414')
        .setDescription(`A member of ${message.guild.name} said a Banned Phrase.`)
        .addField(`Basic Info:`, `Author: \`${mauthortag}\` (${mauthor}) \n Time: \`${moment(mtime).format('L')} @ ${moment(mtime).format('LTS')}\` \n Channel: ${mchannel} \n\n`, true)
        .addField('Advanced Info:', `Author ID: \`${mauthorid}\` \n Message ID: \`${mid}\` \n Message URL: [Jump to Message](${mlink})`, true)
        .addField(`Message Content:`, `\`\`\`${mtext}\`\`\``, false) 
        .setFooter('Made with ❤ by larkx#0001')
      
      bot.channels.cache.get(config.log_channel).send(embed);
      bot.users.cache.get(mauthorid).send(`You said a banned phrase in **${guildname}**. \`\`\`${mtext}\`\`\``);
    }
});

bot.login(config.token);