const fetch = require('node-fetch');
const Discord = require('discord.js');

/* 
 * API source: googled and found on rapidapi.com under free
 */

module.exports = {
	name: 'cat',
	description: 'An enlightening piece of cat fact that will change your life.',
	usage: '.cat',
	cooldown: 10,
	async execute(message, args){
		const data = await fetch("https://brianiswu-cat-facts-v1.p.rapidapi.com/facts", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b2c34774e4msheec32c9f0cdc75cp1c9166jsn26066a19d90a",
		"x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com"
		}})
		.then(response => response.text())
		.then(test_response => JSON.parse(test_response))
			.catch(error => {
				console.log(error);
				message.channel.send('Cricket sounds.\nAn error occured while executing that command.');
			});
		// DEBUG:
		//console.log(data.all);
		//
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
