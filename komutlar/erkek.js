const { MessageEmbed, Discord } = require('discord.js');
const data = require('quick.db');
const jdb = new data.table("kayıtlar");
const kdb = new data.table("kullanici");
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
if(![(ayarlar.KayıtYetkilisi)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('8b0606').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  const erkekrol = message.guild.roles.cache.find(r => r.id === '795702964009959424')
  const erkekroll = message.guild.roles.cache.find(r => r.id === '795702964588642375')
  const erkekol = message.guild.roles.cache.find(r => r.id === '795702965608251433')
  const emoji = message.guild.emojis.cache.find(r => r.id === (ayarlar.emojiisim))

  const unregister = message.guild.roles.cache.find(r => r.id === '795702967079927838')

  let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kullanici) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Erkek olarak kayıt edilicek Bir Kullanıcı Etiketlemelisin`))
  if(!kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`))

  
  kullanici.roles.add(erkekrol)
  kullanici.roles.add(erkekroll)
  kullanici.roles.add(erkekol)
  kullanici.roles.remove(unregister)
  



message.react(emoji)
const embed = new MessageEmbed
.setColor('00fff1')
.setTitle('Kayıt İşlemi Başarılı')
.setDescription(`${kullanici}, <@&${message.author.id}> tarafından ${erkekrol} olarak kaydedildi.`)
.setFooter(`\`.isim @Üye İsim Yaş\` Yazmayı Unutma!`)
message.channel.send(embed)


};  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['e'],
  permLevel: 0
}
exports.help = {
  name: 'erkek'
}