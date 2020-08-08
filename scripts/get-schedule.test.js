const getSchedule = require('./get-schedule')

const campus = {
	"SUCRE": 1,
	"CAMPINIA": 2
}

const types = {
	"CLASSROOM": 1,
	"LABORATORY": 2
}

it('Should get schedule by room id', () => {
	const options = {
		campus: campus["CAMPINIA"],
		type: types["CLASSROOM"],
		room: 188
	}

	return getSchedule(options)
		.then(console.log)
}, 10000)
