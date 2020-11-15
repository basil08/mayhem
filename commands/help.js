const {prefix, version,bot_name, bot_author} = require('../config.json');

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

			data.push(`${command.name}`);

			if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
			if (command.description) data.push(`Description: ${command.description}`);
			if (command.usage) data.push(`Usage: ${command.usage}`);

			command.cooldown ? data.push(`Cooldown: ${command.cooldown}`) : data.push(`This command has no cooldown!`);

			message.channel.send(data, {split: true});
		}
	}
}


