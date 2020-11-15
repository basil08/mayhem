module.exports = {
	name: 'whoami',
	description: 'Well, if it was a particularly cool booze party',
	usage: '',
	execute(message, args){
		message.channel.send(`Your username is: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
}
