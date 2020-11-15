const {bot_name} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'hi',
	description: 'A nice introduction is the gentleman\'s way.',
	usage: '',
	execute(message, args){
		// 'yo! i am the mayhem bot. nice to meet you, author
		const embed = new Discord.MessageEmbed()
			.setColor('#00ebc7')
			.setTitle(`Hello! ${message.author.username}`)
			.addFields(
				{name: `${bot_name} bot says...`, value: `Yo! Nice to meet you!`},
			)
			.setTimestamp();

		message.channel.send(embed);
	}
}
