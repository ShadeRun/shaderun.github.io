(() => {
	const current_date = new Date();
	const current_year = current_date.getFullYear();
	const current_month = ('0' + (current_date.getMonth() + 1)).slice(-2);
	const current_day = ('0' + current_date.getDate()).slice(-2);
	const current_date_str = current_year + '-' + current_month + '-' + current_day;
	const storage = JSON.parse(localStorage.getItem('qod')) || undefined;

	if(storage && storage.date === current_date_str) {
		setData(storage);
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
				const date = content.date;
				const tags = content.tags;
				const qod = { quote, author, date, tags };

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
