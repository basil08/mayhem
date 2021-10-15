const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'joke',
	description: 'Tells you a joke who will never forget.',
	cooldown: 5,
	usage: '.joke - A random joke from all categories\n.joke lc - List Categories to choose from\n.joke <category-name> - a random joke from <category-name>\n',
	aliases: ['j'],
	async execute(message, args){
		const categories = ['general','knock-knock','programming'];
		const joke_color = '#12efef';
		const category_color = '#12efef';

		if(!args.length){
			// get a random joke
			const joke = await fetch('https://official-joke-api.appspot.com/jokes/random')
			.then(response => response.text())
			.then(text_response => JSON.parse(text_response))
			.catch(error => {
				console.error(error);
				message.channel.send('An Error occurred while executing that command!');
			});

			const payload = new Discord.MessageEmbed()
			.setTitle('A Joke you cannot refuse')
			.setColor(joke_color)
			.addFields(
				{name: 'Question', value: joke.setup ? joke.setup : 'No question available'},
				{name: '\u200b', value: '\u200b'},
				{name: 'Answer', value: joke.punchline ? joke.punchline : 'No answer available'},
				{name: 'Category',value: joke.type ? joke.type : 'No category'},
			).setTimestamp();

			message.channel.send(payload);
		}
		else if(args[0] === 'lc') {
			const embed = new Discord.MessageEmbed()
			.setTitle('Joke lc')
			.setColor(category_color)
			.addFields(
				{name: 'Categories',value: (categories) ? categories.join('\n'): 'No categories available! Sorry!' }
			)
			.setTimestamp();

			message.channel.send(embed);
		}else{
			if(categories.includes(args[0])){
			
			console.log('if entered. category found'+args[0]);
		
			let queryURI = `https://official-joke-api.appspot.com/jokes/${args[0]}/random`;

			console.log(queryURI);

			const joke = await fetch(queryURI)
			.then(response => response.text())
			.then(text_response => JSON.parse(text_response))
			.catch(error => {
				console.error(error);
				message.channel.send('An Error occurred while executing that command!');
			});
			
			console.log(joke);

			const payload = new Discord.MessageEmbed()
			.setTitle(`A ${args[0]} Joke you cannot refuse`)
			.setColor(joke_color)
			.addFields(
				{name: 'Question', value: joke.setup},
				{name: '\u200b', value: '\u200b'},
				{name: 'Answer', value: joke.punchline ? joke.punchline : 'No answer available'},
				{name: 'Category',value: joke.type ? joke.type : 'No category'},
			).setTimestamp();

			message.channel.send(payload);

			}else{
				message.reply('Choose a valid category name -_-');
			}
			
		}
	}
}
			
