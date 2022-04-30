const base_url = 'http://deckofcardsapi.com/api/deck/';
let cardArea = document.getElementById('card-area');

async function singleCard() {
	let data = await $.getJSON(`${base_url}/new/draw/`);
	let { suit, value } = data.cards[0];
	console.log(`${value} of ${suit}`);
}
singleCard();

async function twoCards() {
	let firstCard = await $.getJSON(`${base_url}/new/draw/`);
	newDeck = firstCard.deck_id;
	let secondCard = await $.getJSON(`${base_url}/${newDeck}/draw/`);

	[ firstCard, secondCard ].forEach((singleCard) => {
		let { suit, value } = singleCard.cards[0];
		console.log(`${value} of ${suit}`);
	});

	console.log(firstCard, secondCard);
}
twoCards();

$(function() {
	let baseURL = 'https://deckofcardsapi.com/api/deck';

	async function setup() {
		let $btn = $('button');
		let $cardArea = $('#card-area');

		let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
		$btn.show().on('click', async function() {
			let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
			let cardSrc = cardData.cards[0].image;
			let angle = Math.random() * 90 - 45;
			let randomX = Math.random() * 40 - 20;
			let randomY = Math.random() * 40 - 20;
			$cardArea.append(
				$('<img>', {
					src : cardSrc,
					css : {
						transform : `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
					}
				})
			);
			if (cardData.remaining === 0) $btn.remove();
		});
	}
	setup();
});
