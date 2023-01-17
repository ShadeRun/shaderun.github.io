(() => {
	const storage = localStorage.getItem('qod');

	if(storage) {
		setData(JSON.parse(storage));
	} else {
		fetch('https://quotes.rest/qod', {
				'Content-type': 'application/json'
			})
			.then(response => {
				if(!response.ok) return Promise.reject('An error occured. Please try again later.');
				return response.json();
			})
			.then(data => {
				const content = data.contents.quotes[0];
				const quote = content.quote;
				const author = content.author;
				const background = content.background;
				const date = content.date;
				const tags = content.tags;
				const qod = { quote, author, background, date, tags };

				localStorage.setItem('qod', JSON.stringify(qod));
				setData(qod);
			})
			.catch(error => quote.innerText = error);
	}

	function setData(storage) {
		const date_wrap = document.getElementById('date');
		const quote_wrap = document.getElementById('quote');
		const tags_wrap = document.getElementById('tags');

		date_wrap.innerText = storage.date;
		quote_wrap.innerHTML = storage.quote + ' - ' + `<em>${storage.author}</em>`;
		tags_wrap.innerHTML = storage.tags.map(tag => `<span>${tag}</span>`).join('');
	}
})();
