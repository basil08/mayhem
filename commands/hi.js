const {bot_name} = require('../config.json');

module.exports = {
	name: 'hi',
	description: 'A nice introduction is the gentleman\'s way.',
	usage: '',
	execute(message, args){
		message.channel.send(`Yo! I am the ${bot_name} Bot. Nice to meet you! ${message.author}`);
	}
}
