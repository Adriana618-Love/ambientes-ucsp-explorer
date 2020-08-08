const querystring = require('query-string')
const body = require('../body.json')

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
	getBody,
	getStringifiedBody
}
