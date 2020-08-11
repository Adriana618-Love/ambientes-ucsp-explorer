const moment = require('moment')
const jsonfile = require('jsonfile')
const map = require('async/map')
const fs = require('fs')

const { fetchSchedule } = require('./fetch-schedule')

const { campus, types } = require('./constants')

const rooms = require('../assets/rooms.json')


const normalizeArray = (arr, prop) => {
	const assignBy = key => (data, item) => {
		data[item[key]] = item
		return data
	}

	return arr.reduce(assignBy(prop), {})
}

const normalizedRooms = normalizeArray(rooms, 'nombre')

const getRoomData = (roomName, day) => {
	const room = normalizedRooms[roomName]
	return {
		room: room['codigo'],
		type: types[room['ambiente']],
		campus: campus[room['campus']],
		date: day,
	}
}

const getWeekSchedule = (roomName, date) => {
	return fetchSchedule(getRoomData(roomName, date))
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
		.then(allRoomsSchedules => {
			const normalizedSchedules = normalizeArray(allRoomsSchedules, 'roomName')
			return jsonfile.writeFile(file, normalizedSchedules)
		})

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

const getAllRoomsAvailable = (day, file, hour, onFetch) =>
	getSchedules(day, file, onFetch)
		.then(schedules => Object.values(schedules).filter(schedule => isFree(schedule, hour)))
		.then(schedules => schedules.map(schedule => schedule.roomName))

module.exports = {
	getAllRoomsAvailable,
	isFree,
	getSchedules,
	fetchAndSaveAllSchedules,
	getWeekSchedule,
	getRoomData,
}
