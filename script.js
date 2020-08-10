const { getSchedule } = require('./scripts/schedule.utils')
const moment = require('moment')

getSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))
	.then(console.log)
