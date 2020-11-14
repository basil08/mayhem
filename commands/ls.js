const {version, bot_author} = require('../config.json');

module.exports = {
	name: 'ls',
	description: 'list all the command names',
	usage: 'ls',
	aliases: ['commands'],
	execute(message, args){
		const data = [];
		const {commands} = message.client;

		if(!args.length){
			data.push(`This is the Harvester Bot version ${version}`);
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\n\nIf you are nodding at this command name, then ${bot_author} says you are cool!`);
			return message.channel.send(data, {split: true});
		}
		else{
			return message.channel.send(`ls doesn't support arguments now`);
		}
	}
}
