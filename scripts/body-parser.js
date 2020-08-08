const querystring = require('query-string')
const body = require('../body.json')

const getBody = ({ campus, type, room }) => {
	return {
		...body,
		"ddl_campus": String(campus),
		"hf_tipo": String(type),
		'ddl_tipo': String(type),
		"hf_ambiente": String(room),
		"ddl_ambiente": String(room),
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
