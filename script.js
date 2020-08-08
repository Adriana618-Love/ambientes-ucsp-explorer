const { getRoomData, getSchedule } = require('./scripts/get-schedule')
const moment = require('moment')


const roomData = getRoomData('N419  (Cap.: 24)')

const options = {
	...roomData,
	date: moment('2020-05-09', 'YYYY-MM-DD')
}

return getSchedule(options)
	.then(console.log)
