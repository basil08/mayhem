const Discord = require('discord.js');
const fs = require('fs');

/* 
 * API source: googled and found on rapidapi.com under free
 */

module.exports = {
	name: 'cat',
	description: 'An enlightening piece of cat fact that will change your life.',
	usage: '.cat',
	cooldown: 5,
	async execute(message, args){
		// try to read local file
		let data_file_name = '\\cat_data.json';
		let data = JSON.parse(fs.readFileSync(__dirname + data_file_name));
	
		// choose a random cat fact
		let index = Math.floor(Math.random() * data.all.length);
		const factText = data.all[index].text;
		const upVotes = parseInt(data.all[index].upvotes);

		const payload = new Discord.MessageEmbed()
		.setTitle('Who wants a cat fact?')
		.setColor('#ffa500')
		.addFields(
			{name: 'Fact', value: factText},
			{name: '\u200b', value: '\u200b'},
			{name: 'Upvotes', value: upVotes}
		)
		.setTimestamp();

		message.channel.send(payload);

	}
}
