const {prefix, version,bot_name, bot_author} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Display all available commands',
	aliases: ['h','?'],
	execute(message, args){
		const data = [];
		const {commands} = message.client;

		if(!args.length){
			// show all commands
			data.push(`This is the ${bot_name} Bot version ${version}`);
			data.push(commands.map(command => command.name).join(', '));
			data.push(`Use ${prefix}help [command name] to get details about [command name]`);
			data.push(`All commands are prefixed by the ${prefix} (period)`);
			data.push(`\n\nSend your love to ${bot_author} ;)`);

			// split: true splits the message into separate messages if char count > 2000
			return message.author.send(data, {split: true})
				.then(() => {	// DM as help message can get messy
					if(message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM');
				})
				.catch(error => {  // the case when user has DM disabled must be gracefully handled
					console.error(`Could not send help DM to ${message.author.tag}.\n`,error);
					message.reply('I can\'t DM you. Do you have DMs disabled?');
				});
		}else{
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if(!command){
				return message.reply('Not a valid command -_-');
			}

			const embed = new Discord.MessageEmbed()
			.setTitle(`Help for ${command.name}`)
			.setColor('#02fede')
			.addFields(
				{name: 'Aliases', value: (command.aliases) ? `${command.aliases.join(', ')}`: 'There are no aliases for this command!'},
				{name: 'Description', value: (command.description) ? `${command.description}`: 'Currently no description available!'},
				{name: 'Usage', value: (command.usage) ? `${command.usage}`:'Currently no usage available!'},
				{name: 'Cooldown', value: (command.cooldown) ? `${command.cooldown} second(s)`: 'This command has no cooldown!'}
			)
			.setTimestamp();

			message.channel.send(embed);
		}
	}
}


