const fetch = require('node-fetch')

const { getStringifiedBody } = require('./body-parser')

const { campus, types } = require('./constants')

const rooms = require('../rooms.json')

function fetchSchedule(options) {
  return new Promise((resolve, reject) =>
    fetch("https://consultambientes.ucsp.edu.pe/", {
      "headers": {
        "accept": "*/*",
        "accept-language": "es,en-US;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.3.1889463502.1595625953; _gcl_au=1.1.295227520.1595625958; __zlcmid=zXjKuLMfNJrOSE; _gid=GA1.3.1112565537.1596843519; ASP.NET_SessionId=1wr01ocbi3ohvecuvop4lmek; ARRAffinity=4e51d4d933ab1a70ec624920854df4c5378fd73d6e1aec12e2a46b8730c6f421"
      },
      "referrer": "https://consultambientes.ucsp.edu.pe/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": getStringifiedBody(options),
      "method": "POST",
      "mode": "cors"
    })
      // Removes an noisy character
      .then(resp => resp.text())
      .then(resp => JSON.parse(resp.slice(1)))

      .then(schedule => resolve(schedule))
      .catch(error => reject(error))
  )
}

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
