const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const files = fs.readdirSync('./commands').filter(name => name.endsWith('.js'));

for(const f of files){
	const command = require(`./commands/${f}`);

	// According to Discord API, Discord.Collection is a JS Map Object with more convenience methods
	//
	// Set the record with key as the command name and value as the command itself
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message) => {
	console.log(`Incoming:\n${message.author.username} says ${message.content}`);

	// Don't interfere when you are not required and don't be dumb enough to reply to your own msgs.
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const cmdname = args.shift().toLowerCase();

	// COMMAND ALIASING
	// see <command>.aliases
	const cmd = client.commands.get(cmdname)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdname));

	if(!cmd) return;

	// provide EXPECTED COMMAND USAGE for oblivious users. 
	// Good UX
	// see <command>.usage
	if(cmd.args && !args.length){
		let reply = 'You must provide arguments for this command';

		if(cmd.usage){
			reply += `\nThe correct usage of this command is:\n${prefix}${cmd.name} ${cmd.usage}`;
		}
		message.channel.send(reply);
		
		return;
	}

	// If the command has a cooldown period, 
	// Wait for that much time
	// else inform user gracefully.
	if(cmd.cooldown){
		if(!cooldowns.has(cmd.name)){
			cooldowns.set(cmd.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(cmd.name);
		const cdtime = (cmd.cooldown) * 1000;

		if(timestamps.has(message.author.id)){
			const expirationDate = timestamps.get(message.author.id) + cdtime;
			
			if(now < expirationDate){
				const timeLeft = (expirationDate - now) / 1000;
				return message.reply(`You have to wait ${timeLeft.toFixed(1)} more second(s) to use the ${cmd.name} command`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cdtime);
	}

	try{
		cmd.execute(message, args);
	}catch(err){
		console.error(err);
		message.reply('Oops. There was an error while executing that command.');
	}
});

client.login(token);
