const { getRoomData, getSchedule } = require('./scripts/get-schedule')
const moment = require('moment')

const options = {
	...getRoomData('N419  (Cap.: 24)'),
	date: moment('2020-05-09', 'YYYY-MM-DD')
}

getSchedule(options)
	.then(console.log)
