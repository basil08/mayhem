const Discord = require('discord.js');

module.exports = {
	name: 'whoami',
	description: 'Well, if it was a particularly cool booze party (For context: See whereami command)',
	usage: '',
	execute(message, args){
		const embed = new Discord.MessageEmbed()
		.setTitle('Who are you?')
		.setColor('#ff5470')
		.addFields(
			{name: `Your username`,value: `${message.author.username}`},
			{name: `Your ID`, value: `${message.author.id}`}
		)
		.setTimestamp();

		message.channel.send(embed);
	}
}
