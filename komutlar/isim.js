const { MessageEmbed, Discord } = require('discord.js');
const data = require('quick.db');
const jdb = new data.table("kayıtlar");
const kdb = new data.table("kullanici");
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
if(!(ayarlar.KayıtYetkilisi).some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('8b0606').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  

//CONSTLAR
   const numara = await data.fetch('case')
   const emoji = message.guild.emojis.cache.find(r => r.name === (ayarlar.emojiisim))

  let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kullanici) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`İsimi Değiştirilecek üye etiketle`))
  if(!kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`))

  let isim = args[1]
  let yaş = args[2]
  if(!isim) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Kullanıya Bir isim girmediniz!`))
  if(!yaş) return message.channel.send(new MessageEmbed().setColor('8b0606').setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Kullanıya Bir yaş girmediniz!`))
 


kullanici.setNickname(`${tag} ${isim} | ${yaş}`)  
message.react(emoji)
    let kayıtlar = jdb.get(`erkek`) || [];
if (!kayıtlar.some(j => j.id == kullanici.id)) {
kdb.add(`kullanici.${message.author.id}.kayıt`, 1);
data.add('case', 1)
if(numara === null) numara = "0"
if(numara === undefined) numara = "0"
moment.locale("tr");
kdb.push(`kullanici.${kullanici.id}.kayıt`, {
Yetkili: message.author.id,
isimyaş: `${tag} ${isim} | ${yaş}`, 
Tarih: (`${moment(Date.now()).add(10,"hours").format("DD MMMM YYYY")}`),
kayıtno: numara
});
};


  moment.locale('tr')
  data.add(`toplamik_${kullanici.id}`, 1)
  let toplamik = await data.fetch(`toplamik_${kullanici.id}`) || '0'
  let kayıt = kdb.get(`kullanici.${kullanici.id}.kayıt`) || [];
  let kayıtkontrolü = kayıt.length > 0 ? kayıt.map((ramo, index) => `\`${ramo.isimyaş}\` Yetkili: ${message.guild.members.cache.has(ramo.Yetkili) ? message.guild.members.cache.get(ramo.Yetkili) : ramo.Yetkili} \`${ramo.Tarih}\``).join("\n") : "Kullanıcının Eski Bir İsmi Bulunamadı";
  const register = new MessageEmbed()
  .setDescription(`${kullanici} üyesinin ismi başarıyla \`${isim} | ${yaş}\` olarak değiştirildi.
  
  Kullanıcının veri tabanında \`${toplamik}\` isim kayıtı bulundu. Bu isimler: 
  ${kayıtkontrolü}
  
  Kayıt numarası: (\`#${numara}\`)
  
  Kullanıcının isim geçmişine bakmak için \`.isimler @Üye/ID\` komutunu kullanabilirsiniz.`)
  message.channel.send(register)
  
  

};  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['i'],
  permLevel: 0
}
exports.help = {
  name: 'isim'
}