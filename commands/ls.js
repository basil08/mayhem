const {version, bot_name, bot_author} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'ls',
	description: 'list all the command names',
	usage: '.ls',
	aliases: ['commands'],
	execute(message, args){
		const data = [];
		const {commands} = message.client;

		if(!args.length){
			const embed = new Discord.MessageEmbed()
			.setTitle(`This is the ${bot_name} Bot version ${version}`)
			.setColor('#fa5246')
			.addFields({name: 'Commands available', value: commands.map(command => '\t\t'+command.name).join('\n')})
			.setTimestamp();

			return message.channel.send(embed);
		}
		else{
			return message.channel.send(`ls doesn't support arguments now`);
		}
	}
}
