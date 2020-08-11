const moment = require('moment')
const jsonfile = require('jsonfile')
const map = require('async/map')
const fs = require('fs')

const { fetchSchedule } = require('./fetch-schedule')

const { campus, types } = require('./constants')

const rooms = require('../assets/rooms.json')


const assignBy = key => (data, item) => {
	data[item[key]] = item
	return data
}

const normalizedRooms = rooms.reduce(assignBy('nombre'), {})

const getRoomData = (roomName, date) => {
	const room = normalizedRooms[roomName]
	return {
		room: room['codigo'],
		type: types[room['ambiente']],
		campus: campus[room['campus']],
		date,
	}
}

const getWeekSchedule = (roomName, date) => {
	return fetchSchedule(getRoomData(roomName, date))
}

const isFree = (schedule, hourToCheck) => {
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

const fetchAndSaveAllSchedules = (day, file) =>
	map(rooms, (room, callback) => {
		getWeekSchedule(room.nombre, day)
			.then(schedule => {
				return callback(null, {
					...schedule,
					roomName: room.nombre
				})
			})
	})
		.then(allRoomsSchedule => {
			const normalizedSchedules = allRoomsSchedule.reduce(assignBy('roomName'), {})
			return jsonfile.writeFile(file, normalizedSchedules)
		})

const getSchedules = (day, file, onFetch) => {
	if (fs.existsSync(file)) {
		return jsonfile.readFile(file)
	} else {
		if (onFetch) {
			onFetch()
		}
		return fetchAndSaveAllSchedules(day, file)
			.then(() => jsonfile.readFile(file))
	}
}

module.exports = {
	getWeekSchedule,
	getRoomData,
	isFree,
	fetchAndSaveAllSchedules,
	getSchedules,
}
