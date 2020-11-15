const fs = require('fs');
const fetch = require('node-fetch');
const {CAT_API_KEY} = require('./config.json');

async function writeData(){
	const data = await fetch("https://brianiswu-cat-facts-v1.p.rapidapi.com/facts", 
		{
			"method": "GET",
			"headers": {
				"x-rapidapi-key": CAT_API_KEY, 
				"x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com"
				   }
		})
		.then(response => response.text())
		.then(test_response => JSON.parse(test_response))
		.catch(error => {
			console.log(error);
		});

	let raw_data = JSON.stringify(data, null, 2);
	console.log(raw_data);
	fs.writeFileSync('./static/data/cat_data.json', raw_data);

	console.log('written.');
}
writeData();
