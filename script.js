const { getSchedule, isFree } = require('./scripts/schedule.utils')
const moment = require('moment')

getSchedule('N419  (Cap.: 24)', moment('2020-05-07', 'YYYY-MM-DD'))
	.then(schedule => {
		if (isFree(schedule, new Date('2020-05-07 6:59:00'))) {
			console.log('Esta libre 😊')
		} else {
			console.log('Esta ocupado 😢')
		}
	})
