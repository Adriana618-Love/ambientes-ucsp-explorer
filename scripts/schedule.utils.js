const { campus, types } = require('./constants')

const rooms = require('../rooms.json')

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

module.exports = {
  getWeekSchedule,
  getRoomData
}
