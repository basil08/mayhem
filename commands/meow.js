const fetch = require('node-fetch');

module.exports = {
	name: 'meow',
	description: 'Coz everyone likes cats!',
	usage: '.meow',
	cooldown: 10,
	async execute(message, args){
		const file = await fetch('https://aws.random.cat/meow')
			.then(file => file.text())
			.catch(err => { 
				console.error(err);
				message.channel.send(`An Error was encountered while executing that command.`);
			});
		message.channel.send(JSON.parse(file).file);

	}
}
