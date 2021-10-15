module.exports = {
	name: 'reload',
	description: 'Reloads a command. (Developer command)',
	execute(message, args){
		if(!args.length) return message.channel.send(`Specify a command, ${message.author.username}`);
		const cmdname = args[0].toLowerCase();
		const command = message.client.commands.get(cmdname)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.include(cmdname));

		if(!command) return message.channel.send(`fatal: ${cmdname}: no such command found`);

		// NOTE: require() caches the file
		// to remove the file from cache, see below
		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCmd = require(`./${command.name}.js`);
			message.client.commands.set(newCmd.name, newCmd);
			message.channel.send(`Command ${command.name} was reloaded!`);
		}catch(error){
			console.log(error);
			message.channel.send(`fatal: ${command.name}: There was an error while reloading this command.`);
		}
	}
}
