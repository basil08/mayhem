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
		// read from saved static data
		// good for quick response
		// this cat api has no endpoints. either all data or none
		// obviously, all for each request is an overkill
		//
		// but this approach has flaws as what if data on API is changed?
		// one solution: make a request each time bot reboots
		// but ok, I am lazy...
		//
		let data_file_name = '\\cat_data.json';
		let data = JSON.parse(fs.readFileSync(__dirname + data_file_name));

		let index = Math.floor(Math.random() * data.all.length);
		const factText = data.all[index].text;
		const upVotes = parseInt(data.all[index].upvotes);

		// DEBUG: 
		// console.log(factText);
		// console.log(index);
		//
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
