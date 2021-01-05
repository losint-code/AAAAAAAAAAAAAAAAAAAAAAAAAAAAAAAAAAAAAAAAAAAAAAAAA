const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = ("../ayarlar.json")

module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if(![(ayarlar.teyitçi)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('8b0606').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
   
//-------------------------------------------------------------------------------\\
  
  
let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
if (!kullanici) return message.channel.send(new MessageEmbed().setDescription('Lütfen Geçerli Bir Kullanıcı Belirtiniz'))
let uye = message.guild.member(kullanici);
let kayıt = kdb.get(`kullanici.${uye.id}.kayıt`) || [];
moment.locale("tr");
kayıt = kayıt.reverse();
let kayıtkontrolü = kayıt.length > 0 ? kayıt.map((ramo, index) => `\`${index + 1}.\` \`${ramo.isimyaş}\` Yetkili: ${message.guild.members.cache.has(ramo.Yetkili) ? message.guild.members.cache.get(ramo.Yetkili) : ramo.Yetkili} Tarih: **${ramo.Tarih}** Kayıt Numarası: (\`#${ramo.kayıtno}\`)`).join("\n\n") : "<:olumsuz:792422929144217611> İsim geçmişine bakmak istediğin "+`${kullanici}`+" üyesinin kayıtlı isim verisi yok";

message.react(`792422989072826390`)
message.channel.send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setDescription(`\n\n${kayıtkontrolü}`))
};

module.exports.conf = {
    guildOnly: true,
    aliases: ["kontrol","isimler"],
    permLevel: 0
};

module.exports.help = {
    name: "geçmiş",
};
