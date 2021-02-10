'use strict';

var _, _2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var countryConfig = {
	'1': {
		lang: 'com',
		tncLink: 'https://www.888poker.com/terms/888spin',
		moreInfo: 'https://www.888poker.com/terms/888spin',
		cta: {
			"en": "SPIN NOW",
			"fr": "TOURNEZ MAINTENANT",
			"es": "GIRA YA",
			"pt": "GIRE JÁ",
			"ru": "ВРАЩАТЬ",
			"de": "JETZT DREHEN"
		}
	},
	'76': {
		lang: 'ro',
		tncLink: 'https://www.888poker.ro/promotions/poker-roulette/tcs',
		moreInfo: 'https://www.888poker.ro/promotions/poker-roulette/tcs',
		cta: {
			"en": "SPIN NOW",
			"ro": "ROTEȘTE ACUM"
		}
	},
	'75': {
		lang: 'dk',
		tncLink: 'https://www.888poker.dk/promotions/pokerroulette/tcs',
		moreInfo: 'https://www.888poker.dk/promotions/pokerroulette/tcs',
		cta: {
			"en": "SPIN NOW",
			"da": "SPIN"
		}
	},
	'31': {
		lang: 'it',
		tncLink: 'https://www.888poker.it/promozioni/promozioni-attive/pokeroulette/tcs',
		moreInfo: 'https://www.888poker.it/promozioni/promozioni-attive/pokeroulette/tcs',
		cta: {
			"en": "SPIN NOW",
			"it": "RUOATA"
		}
	},
	'58': {
		lang: 'es',
		tncLink: 'https://www.888poker.es/terms/ruleta-jackpot',
		moreInfo: 'https://www.888poker.es/terms/ruleta-jackpot',
		cta: {
			"en": "SPIN NOW",
			"es": "GIRAR AHORA"
		}
	},
	'79': {
		lang: 'pt',
		tncLink: 'https://poker.888.pt/terms/spin',
		moreInfo: 'https://poker.888.pt/terms/spin',
		cta: {
			"en": "Spin Now",
			"pt": "GIRAR"
		}
	},
	'84': {
		lang: 'de',
		tncLink: 'https://poker.888wetten.de/terms/888rad',
		moreInfo: 'https://poker.888wetten.de/terms/888rad',
		cta: {
			"en": "Spin Now",
			"de": "JETZT DREHEN"
		}
	}
};

var prizesObj1 = {
	/* ---------Prizes for COM--------- */
	'1': (_ = {
		"10c BLAST Ticket": {
			name: {
				"en": "10₵ BLAST Ticket",
				"fr": "10₵ BLAST Ticket",
				"es": "10₵ BLAST Ticket",
				"pt": "10₵ BLAST Ticket",
				"ru": "10₵ BLAST Ticket",
				"de": "10₵ BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"$1 BLAST Ticket": {
			name: {
				"en": "$1 BLAST Ticket",
				"fr": "$1 BLAST Ticket",
				"es": "$1 BLAST Ticket",
				"pt": "$1 BLAST Ticket",
				"ru": "$1 BLAST Ticket",
				"de": "$1 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"$5 BLAST Ticket": {
			name: {
				"en": "$5 BLAST Ticket",
				"fr": "$5 BLAST Ticket",
				"es": "$5 BLAST Ticket",
				"pt": "$5 BLAST Ticket",
				"ru": "$5 BLAST Ticket",
				"de": "$5 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		}
	}, _defineProperty(_, '$1 BLAST Ticket', {
		name: {
			"en": "$1 BLAST Ticket",
			"fr": "$1 BLAST Ticket",
			"es": "$1 BLAST Ticket",
			"pt": "$1 BLAST Ticket",
			"ru": "$1 BLAST Ticket",
			"de": "$1 BLAST Ticket"
		},
		slice: 0,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$5.5 Big Fish Ticket", {
		name: {
			"en": "$5.5 Big Fish Ticket",
			"fr": "$5.5 Big Fish Ticket",
			"es": "$5.5 Big Fish Ticket",
			"pt": "$5.5 Big Fish Ticket",
			"ru": "$5.5 Big Fish Ticket",
			"de": "$5.5 Big Fish Ticket"
		},
		slice: 1,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "Winner Spinner Freeroll ticket", {
		name: {
			"en": "Winner Spinner Freeroll ticket",
			"fr": "Winner Spinner Freeroll ticket",
			"es": "Winner Spinner Freeroll ticket",
			"pt": "Winner Spinner Freeroll ticket",
			"ru": "Winner Spinner Freeroll ticket",
			"de": "Winner Spinner Freeroll ticket"
		},
		slice: 2,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$5 Sports Free Bet", {
		name: {
			"en": "$5 Sports Free Bet",
			"fr": "$5 Sports Free Bet",
			"es": "$5 Sports Free Bet",
			"pt": "$5 Sports Free Bet",
			"ru": "$5 Sports Free Bet",
			"de": "$5 Sports Free Bet"
		},
		slice: 3,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$1 Sports Free Bet", {
		name: {
			"en": "$1 Sports Free Bet",
			"fr": "$1 Sports Free Bet",
			"es": "$1 Sports Free Bet",
			"pt": "$1 Sports Free Bet",
			"ru": "$1 Sports Free Bet",
			"de": "$1 Sports Free Bet"
		},
		slice: 3,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$33 Big Fish Ticket", {
		name: {
			"en": "$33 Big Fish Ticket",
			"fr": "$33 Big Fish Ticket",
			"es": "$33 Big Fish Ticket",
			"pt": "$33 Big Fish Ticket",
			"ru": "$33 Big Fish Ticket",
			"de": "$33 Big Fish Ticket"
		},
		slice: 4,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$1 Casino FreePlay", {
		name: {
			"en": "$1 Casino FreePlay",
			"fr": "$1 Casino FreePlay",
			"es": "$1 Casino FreePlay",
			"pt": "$1 Casino FreePlay",
			"ru": "$1 Casino FreePlay",
			"de": "$1 Casino FreePlay"
		},
		slice: 5,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "5€ Casino Free Play", {
		name: {
			"en": "5€ Casino Free Play",
			"fr": "5€ Casino Free Play",
			"es": "5€ Casino Free Play",
			"pt": "5€ Casino Free Play",
			"ru": "5€ Casino Free Play",
			"de": "5€ Casino Free Play"
		},
		slice: 5,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$10 Casino FreePlay", {
		name: {
			"en": "$10 Casino FreePlay",
			"fr": "$10 Casino FreePlay",
			"es": "$10 Casino FreePlay",
			"pt": "$10 Casino FreePlay",
			"ru": "$10 Casino FreePlay",
			"de": "$10 Casino FreePlay"
		},
		slice: 5,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$1 Cash", {
		name: {
			"en": "$1 Cash",
			"fr": "$1 Cash",
			"es": "$1 Cash",
			"pt": "$1 Cash",
			"ru": "$1 Cash",
			"de": "$1 Cash"
		},
		slice: 6,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$10 Cash", {
		name: {
			"en": "$10 Cash",
			"fr": "$10 Cash",
			"es": "$10 Cash",
			"pt": "$10 Cash",
			"ru": "$10 Cash",
			"de": "$10 Cash"
		},
		slice: 6,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "$16.5 Big Fish Ticket", {
		name: {
			"en": "$16.5 Big Fish Ticket",
			"fr": "$16.5 Big Fish Ticket",
			"es": "$16.5 Big Fish Ticket",
			"pt": "$16.5 Big Fish Ticket",
			"ru": "$16.5 Big Fish Ticket",
			"de": "$16.5 Big Fish Ticket"
		},
		slice: 7,
		congratsMsg: "#congrats"
	}), _defineProperty(_, "Game Over!", {
		name: {
			"en": "Game Over!",
			"fr": "Game Over!",
			"es": "Game Over!",
			"pt": "Game Over!",
			"ru": "Game Over!",
			"de": "Game Over!"
		},
		slice: 8,
		congratsMsg: "#no-win"
	}), _),
	/* ---------Prizes for RO--------- */
	'76': {
		"Bilet de 10c BLAST": {
			name: {
				"ro": "Bilet de 10₵ BLAST",
				"en": "10₵ BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"Bilet de 1$ BLAST": {
			name: {
				"ro": "Bilet de 1$ BLAST ",
				"en": "$1 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"Bilet de 5$ BLAST": {
			name: {
				"ro": "Bilet de 5$ BLAST",
				"en": "$5 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"Bilet de 5.5$ la Big Fish": {
			name: {
				"ro": "Bilet de 5.5$ la Big Fish",
				"en": "$5.5 Big Fish Ticket"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"Tichet la Freeroll-ul Spinnerului Câstigator": {
			name: {
				"ro": "Tichet la Freeroll-ul Spinnerului Câștigător",
				"en": "Tichet la Freeroll-ul Spinnerului Câștigător"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"Pariu sportiv gratuit de 25 Lei": {
			name: {
				"ro": "Pariu sportiv gratuit de 25 Lei",
				"en": "Pariu sportiv gratuit de 25 Lei"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"Pariu sportiv gratuit de 5 Lei": {
			name: {
				"ro": "Pariu sportiv gratuit de 5 Lei",
				"en": "Pariu sportiv gratuit de 5 Lei"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"Bilet de 33$ la Big Fish": {
			name: {
				"ro": "Bilet de 33$ la Big Fish",
				"en": "$33 Big Fish Ticket"
			},
			slice: 4,
			congratsMsg: "#congrats"
		},
		"5 Lei FreePlay la Casino": {
			name: {
				"ro": "5 Lei FreePlay la Casino",
				"en": "5 Lei Casino Free Play"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"5€ Casino Free Play": {
			name: {
				"ro": "5€ Casino Free Play",
				"en": "5€ Casino Free Play"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"50 Lei FreePlay la Casino": {
			name: {
				"ro": "50 Lei FreePlay la Casino",
				"en": "50 Lei FreePlay la Casino"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"5 Lei bonus Poker": {
			name: {
				"ro": "5 Lei bonus Poker",
				"en": "5 Lei bonus Poker"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"50 Lei bonus Poker": {
			name: {
				"ro": "50 Lei bonus Poker",
				"en": "50 Lei bonus Poker"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"Bilet de 16.5$ la Big Fish": {
			name: {
				"ro": "Bilet de 16.5$ la Big Fish",
				"en": "$16.5 Big Fish Ticket"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"Game Over!": {
			name: {
				"ro": "Game Over!",
				"en": "Game Over!"
			},
			slice: 8,
			congratsMsg: "#no-win"
		}
	},
	/* ---------Prizes for DK--------- */
	'75': {
		"10 c BLAST billet": {
			name: {
				"da": "10 ₵ BLAST billet",
				"en": "10₵ BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"1 $ BLAST billet": {
			name: {
				"da": "1 $ BLAST billet",
				"en": "$1 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"5 $ BLAST billet": {
			name: {
				"da": "5 $ BLAST billet",
				"en": "$5 BLAST Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"5,5 $ Big Fish billet": {
			name: {
				"da": "5,5 $ Big Fish billet",
				"en": "$5.5 Big Fish Ticket"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"Vinderspin Freeroll-billet": {
			name: {
				"en": "Vinderspin Freeroll-billet",
				"da": "Vinderspin Freeroll-billet"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"50 Kr. Sportsbet": {
			name: {
				"da": "50 Kr. Sportsbet",
				"en": "50 Kr. Sportsbet"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"10 Kr. Sportsbet": {
			name: {
				"da": "10 Kr. Sportsbet",
				"en": "10 Kr. Sportsbet"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"33 $ Big Fish billet": {
			name: {
				"da": "33 $ Big Fish billet",
				"en": "$33 Big Fish Ticket"
			},
			slice: 4,
			congratsMsg: "#congrats"
		},
		"10 kr. Casino Ekstra Spil": {
			name: {
				"da": "10 kr. Casino Ekstra Spil",
				"en": "10 Kr. Casino Free Play"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"100 kr. Casino Ekstra Spil": {
			name: {
				"da": "100 kr. Casino Ekstra Spil",
				"en": "100 Kr. Casino Free Play"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"10 Kr. Cash": {
			name: {
				"da": "10 Kr. Cash",
				"en": "10 Kr. Cash"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"100 Kr. Cash": {
			name: {
				"da": "100 Kr. Cash",
				"en": "100 Kr. Cash"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"16,5 $ Big Fish billet": {
			name: {
				"da": "16,5 $ Big Fish billet",
				"en": "$16.5 Big Fish Ticket"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"Game Over!": {
			name: {
				"da": "Game Over!",
				"en": "Game Over!"
			},
			slice: 8,
			congratsMsg: "#no-win"
		}
	},
	/* ---------Prizes for IT--------- */
	'31': {
		"1€ Ticket Blast": {
			name: {
				"it": "1€ Ticket Blast",
				"en": "1€ Ticket Blast"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"0.1€ Ticket torneo": {
			name: {
				"it": "0.1€ Ticket torneo",
				"en": "0.1€ Ticket torneo"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"1€ Ticket torneo": {
			name: {
				"it": "1€ Ticket torneo",
				"en": "1€ Ticket torneo"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"Ticket Freeroll Ruota Vincente": {
			name: {
				"en": "Ticket Freeroll Ruota Vincente",
				"it": "Ticket Freeroll Ruota Vincente"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"5€ Bonus Sport": {
			name: {
				"it": "5€ Bonus Sport",
				"en": "5€ Bonus Sport"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"1€ Bonus Sport": {
			name: {
				"it": "1€ Bonus Sport",
				"en": "1€ Bonus Sport"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"1€ Giocate Gratis Casinò": {
			name: {
				"it": "1€ Giocate Gratis Casinò",
				"en": "1€ Giocate Gratis Casinò"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"10€ Giocate Gratis Casinò": {
			name: {
				"it": "10€ Giocate Gratis Casinò",
				"en": "10€ Giocate Gratis Casinò"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"10€ Bonus Poker": {
			name: {
				"it": "10€ Bonus Poker",
				"en": "10€ Bonus Poker"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"1€ Bonus Poker": {
			name: {
				"it": "1€ Bonus Poker",
				"en": "1€ Bonus Poker"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"5€ Ticket Blast": {
			name: {
				"it": "5€ Ticket Blast",
				"en": "1€ Ticket Blast"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"0.1€ Ticket Blast": {
			name: _defineProperty({
				"it": "0.1€ Ticket Blast"
			}, 'it', "0.1€ Ticket Blast"),
			slice: 7,
			congratsMsg: "#congrats"
		},
		"Game Over!": {
			name: {
				"it": "Game Over!",
				"en": "Game Over!"
			},
			slice: 8,
			congratsMsg: "#no-win"
		}
	},
	/* ---------Prizes for ES--------- */
	'58': {
		"1 Ticket de 5€ para BLAST": {
			name: {
				"es": "1 Ticket de 5€ para BLAST",
				"en": "1 Ticket de 5€ para BLAST"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"1 Ticket de Torneo de 1€": {
			name: {
				"es": "1 Ticket de Torneo de 1€",
				"en": "1 Ticket de Torneo de 1€"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"1 Ticket de Torneo de 0.1€": {
			name: {
				"es": "1 Ticket de Torneo de 0.1€",
				"en": "1 Ticket de Torneo de 0.1€"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"Freeroll ticket del Giro Seguro": {
			name: {
				"en": "Freeroll ticket del Giro Seguro",
				"es": "Freeroll ticket del Giro Seguro"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"5€ en apuestas gratis de deportes": {
			name: {
				"es": "5€ en apuestas gratis de deportes",
				"en": "5€ en apuestas gratis de sport"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"1€ en apuestas gratis de deportes": {
			name: {
				"es": "1€ en apuestas gratis de deportes",
				"en": "1€ en apuestas gratis de deportes"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"1 Ticket de 55€ para el Torneo Gran Domingo": {
			name: {
				"es": "1 Ticket de 55€ para el Torneo Gran Domingo",
				"en": "1 Ticket de 55€ para el Torneo Gran Domingo"
			},
			slice: 4,
			congratsMsg: "#congrats"
		},
		"10€ en jugadas gratis de casino": {
			name: {
				"es": "10€ en jugadas gratis de casino",
				"en": "10€ en jugadas gratis de casino"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"1€ en jugadas gratis de casino": {
			name: {
				"es": "1€ en jugadas gratis de casino",
				"en": "1€ en jugadas gratis de casino"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"10€ en efectivo": {
			name: {
				"es": "10€ en efectivo",
				"en": "10€ en efectivo"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"1€ en efectivo": {
			name: {
				"es": "1€ en efectivo",
				"en": "1€ en efectivo"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"1 Ticket de 1€ para BLAST": {
			name: {
				"es": "1 Ticket de 1€ para BLAST",
				"en": "1 Ticket de 1€ para BLAST"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"1 Ticket de 0.1€ para BLAST": {
			name: {
				"es": "1 Ticket de 0.1€ para BLAST",
				"en": "1 Ticket de 0.1€ para BLAST"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"Game Over!": {
			name: {
				"es": "Game Over!",
				"en": "Game Over!"
			},
			slice: 8,
			congratsMsg: "#no-win"
		}
	},
	/* ---------Prizes for PT--------- */
	'79': (_2 = {
		"Bilhete de Torneio de 5€": {
			name: {
				"pt": "Bilhete de Torneio de 5€",
				"en": "Bilhete de Torneio de 5€"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"Bilhete de Torneio de 1€": {
			name: {
				"pt": "Bilhete de Torneio de 1€",
				"en": "Bilhete de Torneio de 1€"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"bilhete de Roda do Vencedor Freeroll": {
			name: {
				"en": "bilhete de Roda do Vencedor Freeroll",
				"pt": "bilhete de Roda do Vencedor Freeroll"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"5€ Casino FreePlay": {
			name: {
				"pt": "5€ Casino FreePlay",
				"en": "5€ Casino FreePlay"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"1€ Casino FreePlay": {
			name: {
				"pt": "1€ Casino FreePlay",
				"en": "1€ Casino FreePlay"
			},
			slice: 3,
			congratsMsg: "#congrats"
		},
		"0.1€ Casino Free Play": {
			name: {
				"pt": "0.1€ Casino Free Play",
				"en": "0.1€ Casino Free Play"
			},
			slice: 3,
			congratsMsg: "#congrats"
		}
	}, _defineProperty(_2, 'Bilhete de Torneio de 1\u20AC', {
		name: {
			"pt": "Bilhete de Torneio de 1€",
			"en": "Bilhete de Torneio de 1€"
		},
		slice: 4,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "Bilhete de Torneio de 0.1€", {
		name: {
			"pt": "Bilhete de Torneio de 0.1€",
			"en": "Bilhete de Torneio de 0.1€"
		},
		slice: 4,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "10€ Casino FreePlay", {
		name: {
			"pt": "10€ Casino FreePlay",
			"en": "10€ Casino FreePlay"
		},
		slice: 5,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "2€ Casino FreePlay", {
		name: {
			"pt": "2€ Casino FreePlay",
			"en": "2€ Casino FreePlay"
		},
		slice: 5,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "10€ em Bónus de Poker", {
		name: {
			"pt": "10€ em Bónus de Poker",
			"en": "10€ em Bónus de Poker"
		},
		slice: 6,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "1€ em Bónus de Poker", {
		name: {
			"pt": "1€ em Bónus de Poker",
			"en": "1€ em Bónus de Poker"
		},
		slice: 6,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "Bilhete de Torneio 55€ Grande Domingo", {
		name: {
			"pt": "Bilhete de Torneio 55€ Grande Domingo",
			"en": "Bilhete de Torneio 55€ Grande Domingo"
		},
		slice: 7,
		congratsMsg: "#congrats"
	}), _defineProperty(_2, "Game Over!", {
		name: {
			"pt": "Game Over!",
			"en": "Game Over!"
		},
		slice: 8,
		congratsMsg: "#no-win"
	}), _2),
	/* ---------Prizes for DE--------- */
	'84': {
		"5€ BLAST-Ticket": {
			name: {
				"de": "5€ BLAST-Ticket",
				"en": "5€ BLAST-Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"1€ BLAST-Ticket": {
			name: {
				"de": "1€ BLAST-Ticket",
				"en": "1€ BLAST-Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"0.1€ BLAST-Ticket": {
			name: {
				"de": "0.1€ BLAST-Ticket",
				"en": "0.1€ BLAST-Ticket"
			},
			slice: 0,
			congratsMsg: "#congrats"
		},
		"5,5$ Big Fish-Ticket": {
			name: {
				"en": "5,5$ Big Fish-Ticket",
				"de": "5,5$ Big Fish-Ticket"
			},
			slice: 1,
			congratsMsg: "#congrats"
		},
		"winner spinner freeroll ticket": {
			name: {
				"de": "winner spinner freeroll ticket",
				"en": "winner spinner freeroll ticket"
			},
			slice: 2,
			congratsMsg: "#congrats"
		},
		"33$ Big Fish-Ticket": {
			name: {
				"de": "33$ Big Fish-Ticket",
				"en": "33$ Big Fish-Ticket"
			},
			slice: 4,
			congratsMsg: "#congrats"
		},
		"10€ Spielautomaten-FreePlay": {
			name: {
				"de": "10€ Spielautomaten-FreePlay",
				"en": "10€ Spielautomaten-FreePlay"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"$1 Spielautomat-FreePlay": {
			name: {
				"de": "$1 Spielautomat-FreePlay",
				"en": "$1 Spielautomat-FreePlay"
			},
			slice: 5,
			congratsMsg: "#congrats"
		},
		"10€ Bargeld": {
			name: {
				"de": "10€ Bargeld ",
				"en": "10€ Bargeld "
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"1€ Bargeld": {
			name: {
				"de": "1€ Bargeld",
				"en": "1€ Bargeld"
			},
			slice: 6,
			congratsMsg: "#congrats"
		},
		"16,5$ Big Fish-Ticket": {
			name: {
				"de": "16,5$ Big Fish-Ticket",
				"en": "16,5$ Big Fish-Ticket"
			},
			slice: 7,
			congratsMsg: "#congrats"
		},
		"Game Over!": {
			name: {
				"de": "Game Over!",
				"en": "Game Over!"
			},
			slice: 8,
			congratsMsg: "#no-win"
		}
	}
};