const Discord = require('discord.js');

module.exports = {
	name: 'whereami',
	description: 'Tells you where you currently are. Immensely useful after a booze party ;)',
	usage: '',
	execute(message, args){
		
		const embed = new Discord.MessageEmbed()
		.setTitle('Where are you?')
		.setColor('#ff5470')
		.addFields(
			{name: `Channel name`,value: `${message.channel.name}`},
			{name: `Server name`, value: `${message.guild.name}`}
		)
		.setTimestamp();

		message.channel.send(embed);
	}
}
