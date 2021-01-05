const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const kdb = new data.table("kullanici");
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\
 if(![(ayarlar.KayıtYetkilisi)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('8b0606').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  
//-------------------------------------------------------------------------------\\
  
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if (!member) {
data.delete(`toplamik_${member.id}`)
let kayıt = kdb.delete(`kullanici.${member.id}.kayıt`) || [];
message.channel.send(new MessageEmbed().setDescription(`${message.author} Sana Ait Kayıt Verilerini Sildim!`))
}
  
if(member) {
let kayıt = kdb.delete(`kullanici.${member.id}.kayıt`) || [];
let toplamik = data.delete(`toplamik_${member.id}`) 
data.delete(`toplamik_${member.id}`)
message.channel.send(new MessageEmbed().setDescription(`${member} Kullanıcısına Ait Kayıt Verilerini Sildim!`))

};
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıt-sıfırla","sıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "kayıt-sıfırla",
  description: "",
  usage: ""
};