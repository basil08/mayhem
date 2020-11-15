module.exports = {
	name: 'whereami',
	description: 'Tells you where you currently are. Immensely useful after a booze party ;)',
	usage: '',
	execute(message, args){
		message.channel.send(`Your whereabouts are:\nChannel name: ${message.channel.name}\nServer name: ${message.guild.name}`);
	}
}
