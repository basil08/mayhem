const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message) => {
	console.log(`Incoming:\n${message.author.username} says ${message.content}`);

	// Don't interfere when you are not required and don't be dumb enough to reply to your own msgs.
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const tokens = message.content.slice(prefix.length).trim().split(/ +/);
	const cmd = tokens.shift().toLowerCase();

	if(cmd === 'hi'){
		message.channel.send(`Yo! I am the Harvester Bot. Nice to meet you! ${message.author}`);
	}
	else if(cmd === 'whereami'){
		message.channel.send(`You are on the majestic ${message.guild.name} server! ${message.author}`);
	}
	else if(cmd === 'whoami'){
		message.channel.send(`Your username is: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	else if(cmd === 'rm'){
		if(!message.author.username === 'sugarhiccup'){
			message.reply('GGWP, nibba. But that is only for Sir Sugar, not for a ugly sleazybag like you ;)');
		}

		const count = parseInt(tokens[0]);

		if(isNaN(count)){ 
			message.reply(`${tokens[0]}: That doesn't look like a number to me`);
		} 
		else{
			// +1 to also delete the command to delete also
			message.channel.bulkDelete(count+1, true).catch(err => {
				console.log(err);
				message.channel.send('Sorry, there was a problem encountered while pruning this channel');
			});
		}
	}
	else if(cmd === 'help'){
		const help = `I am the Harvester Bot v0.4rev2\n\nI understand the following commands:\n* help: Display this help message\n* hi: A nice introduction is the gentleman's way.\n* whereami: Tells you where you currently are. Immensely useful after a booze party ;)\n* whoami: Well, if it was a particularly good booze party.\n* rm [int]: Prune that many messages from current channel. (Reserved)\n\nNote: all commands are prefixed by .\n\nSend your love to @sugarhiccup ;)`;
		message.channel.send(help);
	}
});

client.login(token);
