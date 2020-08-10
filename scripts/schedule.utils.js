const moment = require('moment')

const { campus, types } = require('./constants')

const rooms = require('../assets/rooms.json')

const { fetchSchedule } = require('./fetch-schedule')

const assignBy = key => (data, item) => {
	data[item[key]] = item;
	return data;
}

const normalizedRooms = rooms.reduce(assignBy("nombre"), {});

const getRoomData = (roomName, date) => {
  const room = normalizedRooms[roomName]
  return {
    room: room['codigo'],
    type: types[room['ambiente']],
    campus: campus[room['campus']],
    date
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

module.exports = {
  getWeekSchedule,
  getRoomData,
  isFree
}
