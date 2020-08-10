const moment = require('moment')

function isFree(schedule, hourToCheck) {
	for (const event of schedule['Events']) {
		const start = moment(new Date(event['start']))
		const end = moment(new Date(event['end']))
		if ((start.isBefore(hourToCheck) || start.isSame(hourToCheck)) &&
			  (end.isAfter(hourToCheck) || end.isAfter(hourToCheck))) {
			return false
		}
	}
	return true
}

module.exports = {
	isFree,
}
