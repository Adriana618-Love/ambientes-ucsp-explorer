const moment = require('moment')
const express = require('express')

const { getAllRoomsAvailable } = require('./scripts/schedule.utils')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/rooms/available', (req, res) => {
  const queryDay = req.query.day
  const queryHour = req.query.hour

  const day = moment(queryDay, 'YYYY-MM-DD', true)
  const hour = new Date(`${queryDay} ${queryHour}`)

  if (!day. isValid()) {
    res.status(400).send('Invalid day')
  } else if (isNaN(hour.getTime())) {
    res.status(400).send('Invalid hour')
  } else {
    const file = `./schedules/${queryDay}.json`
    const onFetch = () => {
      console.log('It will fetch')
    }

    getAllRoomsAvailable(day, hour, file, onFetch)
      .then(roomsAvailable => {
        res.send(roomsAvailable)
      })
      .catch(() => {
        res.status(400).send('Bad Request')
      })
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
