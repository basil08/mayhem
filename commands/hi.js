module.exports = {
	name: 'hi',
	description: 'A nice introduction is the gentleman\'s way.',
	usage: '',
	execute(message, args){
		message.channel.send(`Yo! I am the Harvester Bot. Nice to meet you! ${message.author}`);
	}
}
