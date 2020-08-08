const getSchedule = require('./scripts/get-schedule')

const campus = {
	"SUCRE": 1,
	"CAMPINIA": 2
}

const types = {
	"CLASSROOM": 1,
	"LABORATORY": 2
}

const options = {
	campus: campus["CAMPINIA"],
	type: types["CLASSROOM"],
	room: 188
}

getSchedule(options)
	.then(console.log)
