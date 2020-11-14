module.exports = {
	name: 'whereami',
	description: 'Tells you where you currently are. Immensely useful after a booze party ;)',
	usage: '',
	execute(message, args){
		message.channel.send(`You are on the majestic ${message.guild.name} server! ${message.author}`);
	}
}
