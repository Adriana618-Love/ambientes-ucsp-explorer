const moment = require('moment')
const fs = require('fs')

const {
	getRoomData,
	getWeekSchedule,
	isFree,
	fetchAndSaveAllSchedules,
	getSchedules
} = require('./schedule.utils')

const ExampleSchedule = require('../test/ExampleSchedule')

const { campus, types } = require('./constants')

const rooms = require('../assets/rooms.json')


describe('Schedule', () => {
	it('Should get an week schedule by room name and day', () => {
		expect.assertions(1)
		return getWeekSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))
			.then(schedule => {
				expect(schedule).toEqual(ExampleSchedule)
			})
	}, 10000)
})


describe('Get Room Data', () => {
	it('Should process an "Aula"', () => {
		const date = moment('2020-05-07', 'YYYY-MM-DD')
		expect(getRoomData('B01  (Cap.: 40)', date)).toEqual({
			room: 126,
			type: types['Aula'],
			campus: campus['Campiña Paisajista'],
			date
		})
	})

	it('Should process an "Laboratorio"', () => {
		const date = moment('2020-05-07', 'YYYY-MM-DD')
		expect(getRoomData('N419  (Cap.: 24)', date)).toEqual({
			room: 39,
			type: types['Laboratorio'],
			campus: campus['Campiña Paisajista'],
			date
		})
	})
})


describe('If an room is free by the date', () => {
	// ExampleSchedule = await getWeekSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))

	test('When its too early, then all rooms are free', () => {
		expect(isFree(ExampleSchedule, new Date('2020-05-07 6:59:00'))).toBe(true)
	})

	test('When begin an class, then the room its not occupied', () => {
		expect(isFree(ExampleSchedule, new Date('2020-05-07 8:30:00'))).toBe(false)
	})

	it('When the class is almost over, then the room its still occupied', () => {
		expect(isFree(ExampleSchedule, new Date('2020-05-07 10:00:00'))).toBe(false)
	})
})


describe('Shows all the rooms that are available by the date', () => {
	test('When its too early, then all rooms are available', () => {
		const day = moment('2020-05-07', 'YYYY-MM-DD')
		const hour = new Date('2020-05-07 6:59:00')
		const file = `./schedules/2020-05-07.json`
		const onFetch = () => {
			console.log('It will fetch')
		}

		expect.assertions(1)
		return getSchedules(day, file, onFetch)
			.then(schedules => Object.values(schedules).filter(schedule => isFree(schedule, hour)))
			.then(schedules => schedules.map(schedule => schedule.roomName))
			.then(roomsAvailable => {
				expect(roomsAvailable).toEqual(rooms.map(room => room.nombre))
			})
	})

	test('When begin an class, then that room is not available', () => {
		const day = moment('2020-05-07', 'YYYY-MM-DD')
		const hour = new Date('2020-05-07 8:30:00')
		const file = `./schedules/2020-05-07.json`
		const onFetch = () => {
			console.log('It will fetch')
		}

		expect.assertions(1)
		return getSchedules(day, file, onFetch)
			.then(schedules => Object.values(schedules).filter(schedule => isFree(schedule, hour)))
			.then(schedules => schedules.map(schedule => schedule.roomName))
			.then(roomsAvailable => {
				expect(roomsAvailable.includes('N419  (Cap.: 24)')).toEqual(false)
			})
	})
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
			.catch(error => {
				console.error(error)
			})
	}, 60000)
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
	}, 60000)
})
