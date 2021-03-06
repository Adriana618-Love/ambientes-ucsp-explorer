const fetch = require('node-fetch')
const querystring = require('query-string')

const body = require('../assets/body.json')

const fetchSchedule = options =>
	new Promise((resolve, reject) =>
		fetch("https://consultambientes.ucsp.edu.pe/", {
			"headers": {
				"accept": "*/*",
				"accept-language": "es,en-US;q=0.9,en;q=0.8",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"cookie": "_ga=GA1.3.1889463502.1595625953; _gcl_au=1.1.295227520.1595625958; __zlcmid=zXjKuLMfNJrOSE; _gid=GA1.3.1112565537.1596843519; ASP.NET_SessionId=1wr01ocbi3ohvecuvop4lmek; ARRAffinity=4e51d4d933ab1a70ec624920854df4c5378fd73d6e1aec12e2a46b8730c6f421"
			},
			"referrer": "https://consultambientes.ucsp.edu.pe/",
			"referrerPolicy": "no-referrer-when-downgrade",
			"body": getStringifiedBody(options),
			"method": "POST",
			"mode": "cors"
		})
		// Removes an noisy character
		.then(resp => resp.text())
		.then(resp => JSON.parse(resp.slice(1)))

		.then(schedule => resolve(schedule))
		.catch(error => reject(error))
)

const getBody = ({ campus, type, room, date }) => {
	return {
		...body,
		"ddl_campus": String(campus),
		"hf_tipo": String(type),
		'ddl_tipo': String(type),
		"hf_ambiente": String(room),
		"ddl_ambiente": String(room),
		'__CALLBACKPARAM': {
			...body['__CALLBACKPARAM'],
			'data': {
				'start': `${date.clone().day(1).format('YYYY-MM-DD')}T00:00:00`,
				'end': `${date.clone().day(8).format('YYYY-MM-DD')}T00:00:00`,
				'days': 7,
				'day': `${date.format('YYYY-MM-DD')}T00:00:00`,
			},
		},
	}
}

const getStringifiedBody = (options) => {
	const newBody = getBody(options)

	return querystring.stringify({
		...newBody,
		'__CALLBACKPARAM': 'JSON' + JSON.stringify(newBody['__CALLBACKPARAM'])
	})
}

module.exports = {
	fetchSchedule,
	getBody,
	getStringifiedBody
}
