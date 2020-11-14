const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
	name: 'whatis',
	description: 'Your own dictionary utility on Discord.\n\nNo googling or changing tabs :)',
	cooldown: 10,
	aliases: ['def','define'],
	async execute(message, args){
		if(!args.length){
			message.reply(`fatal! You need to specify a search term.`);
			return;
		}
		const query = querystring.stringify({term: args.join(' ')});

		// DEBUG
		console.log(query);

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
		// array destructuring...gimme the first elem only
		const [answer] = list;

		// construction of the embed based on JSON returned by API
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{name: 'Description', value: trim(answer.definition, 1024) },
				{name: 'Example', value: trim(answer.example, 1024) },
				{name: 'Rating', value: `{answer.thumbs_up} thumps up. {answer.thumbs_down} thumbs down` }
			);

		message.channel.send(embed);
	}
}
