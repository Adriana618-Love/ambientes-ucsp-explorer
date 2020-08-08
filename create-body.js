const querystring = require('query-string')

const createBody = (body) => {
	return querystring.stringify({
		...body,
		'__CALLBACKPARAM': 'JSON' + JSON.stringify(body['__CALLBACKPARAM'])
	})
}

module.exports = createBody
