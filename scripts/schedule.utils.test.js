const moment = require('moment')
const fs = require('fs')

const {
	getAllRoomsAvailable,
	isFree,
	getSchedules,
	fetchAndSaveAllSchedules,
	getWeekSchedule,
	getRoomData,
} = require('./schedule.utils')

const ExampleSchedule = require('../test/ExampleSchedule')

const { campus, types } = require('./constants')

const rooms = require('../assets/rooms.json')


describe('Shows all the rooms that are available by the date', () => {
	test('When its too early, then all rooms are available', () => {
		const day = moment('2020-05-07', 'YYYY-MM-DD')
		const hour = new Date('2020-05-07 6:59:00')
		const file = `./schedules/2020-05-07.json`
		const onFetch = () => {
			console.log('It will fetch')
		}

		expect.assertions(1)
		return getAllRoomsAvailable(day, hour, file, onFetch)
			.then(roomsAvailable => {
				expect(roomsAvailable).toEqual(rooms.map(room => room.nombre))
			})
			.catch(console.error)
	})

	test('When begin an class, then that room is not available', () => {
		const day = moment('2020-05-07', 'YYYY-MM-DD')
		const hour = new Date('2020-05-07 8:30:00')
		const file = `./schedules/2020-05-07.json`
		const onFetch = () => {
			console.log('It will fetch')
		}

		expect.assertions(1)
		return getAllRoomsAvailable(day, hour, file, onFetch)
			.then(roomsAvailable => {
				expect(roomsAvailable.includes('N419  (Cap.: 24)')).toEqual(false)
			})
			.catch(console.error)
	})
})


describe('check if an room is free by the date', () => {
	// ExampleSchedule = await getWeekSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))

	test('When its too early, then all rooms are free', () => {
		const hour = new Date('2020-05-07 6:59:00')
		expect(isFree(ExampleSchedule, hour)).toBe(true)
	})

	test('When begin an class, then the room its not occupied', () => {
		const hour = new Date('2020-05-07 8:30:00')
		expect(isFree(ExampleSchedule, hour)).toBe(false)
	})

	it('When the class is almost over, then the room its still occupied', () => {
		expect(isFree(ExampleSchedule, new Date('2020-05-07 10:00:00'))).toBe(false)
	})
})


describe('Should get all schedules saved', () => {
	test('When its saved, then just grab it from filesystem', () => {
		const doesExists = '2020-05-09'
		const day = moment(doesExists, 'YYYY-MM-DD')
		const file = `./schedules/${doesExists}.json`
		const onFetchMock = jest.fn(() => {
			console.log('It will fetch')
		})

		expect.assertions(2)
		return getSchedules(day, file, onFetchMock)
			.then(schedule => {
				expect(onFetchMock).not.toBeCalled()
				expect(schedule).toEqual(require(`../schedules/${doesExists}.json`))
			})
			.catch(console.error)
	})

	test('When its not saved, then fetch it', () => {
		const doesNotExist = '2020-05-07'
		const day = moment(doesNotExist, 'YYYY-MM-DD')
		const file = `./schedules/${doesNotExist}.json`
		const onFetchMock = jest.fn(() => {
			console.log('It will fetch')
		})

		if (fs.existsSync(file)) {
			fs.unlinkSync(file)
		}

		expect.assertions(2)
		return getSchedules(day, file, onFetchMock)
			.then(schedule => {
				expect(onFetchMock).toBeCalled()
				expect(schedule).toEqual(require(`../schedules/${doesNotExist}.json`))
			})
			.catch(console.error)
	}, 60000)
})


describe('Fetch all rooms by the date', () => {
	it('Should fetch and save it into a file', () => {
		const day = moment('2020-05-09', 'YYYY-MM-DD')
		const file = './schedules/2020-05-09.json'

		expect.assertions(1)
		return fetchAndSaveAllSchedules(day, file)
			.then(() => {
				expect(fs.existsSync(file)).toBe(true)
			})
			.catch(console.error)
	}, 60000)
})

describe('Get week Schedule', () => {
	it('Should get an week schedule by room name and day', () => {
		const roomName = 'N419  (Cap.: 24)'
		const day = moment('2020-05-09', 'YYYY-MM-DD')

		expect.assertions(1)
		return getWeekSchedule(roomName, day)
			.then(schedule => {
				expect(schedule).toEqual(ExampleSchedule)
			})
			.catch(console.error)
	}, 10000)
})

describe('Get Room Data', () => {
	it('Should process an "Aula"', () => {
		const roomName = 'B01  (Cap.: 40)'
		const day = moment('2020-05-07', 'YYYY-MM-DD')

		expect(getRoomData(roomName, day)).toEqual({
			room: 126,
			type: types['Aula'],
			campus: campus['Campiña Paisajista'],
			date: day,
		})
	})

	it('Should process an "Laboratorio"', () => {
		const day = moment('2020-05-07', 'YYYY-MM-DD')

		expect(getRoomData('N419  (Cap.: 24)', day)).toEqual({
			room: 39,
			type: types['Laboratorio'],
			campus: campus['Campiña Paisajista'],
			date: day,
		})
	})
})
