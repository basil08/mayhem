const querystring = require('querystring');
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'whatis',
	description: 'Your own dictionary utility on Discord.\n\nNo googling or changing tabs :)',
	cooldown: 10,
	usage: '.whatis <search-term>',
	aliases: ['def','define'],
	async execute(message, args){
		if(!args.length){
			message.reply(`fatal! You need to specify a search term.`);
			return;
		}
		const query = querystring.stringify({term: args.join(' ')});
		
		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max-3)}...`: str);

		const {list} = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.text())
			.then(textres => JSON.parse(textres))
			.catch(err => {
				console.error(err);
				message.channel.send(`An Error was encountered while executing that command!`);
			});
		
		if(!list.length){
			message.channel.send(`No results found for "${args.join(' ')}"`);
			return;
		}
		// The first elem only
		// See :Array Destructuring
		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{name: 'Description', value: (answer.definition) ? trim(answer.definition, 1024): 'No description available!' },
				{name: 'Example', value: (answer.example) ? trim(answer.example, 1024) : 'No example available' },
				{name: 'Rating', value: (answer.thumbs_up && answer.thumbs_down) ?`${answer.thumbs_up} thumps up. ${answer.thumbs_down} thumbs down`: 'No rating available' }
			);

		message.channel.send(embed);
	}
}
