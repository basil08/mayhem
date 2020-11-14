module.exports = {
	name: 'rm',
	description: 'Prunes that many messages from current channel. (Reserved)',
	args: true,
	usage: '<int>',
	cooldown: 5,
	aliases: ['remove','prune','del','clear','cls'],
	execute(message, args){
		if(!message.author.username === 'sugarhiccup'){
			message.reply('GGWP, nibba. But that is only for Sir Sugar, not for a ugly sleazybag like you ;)');
		}

		const count = parseInt(args[0]);

		if(isNaN(count)){ 
			message.reply(`${args[0]}: That doesn't look like a number to me`);
		} 
		else{
			// +1 to also delete the command to delete also
			message.channel.bulkDelete(count+1, true).catch(err => {
				console.log(err);
				message.channel.send('Sorry, there was a problem encountered while pruning this channel');
			});
		}
	}
}
