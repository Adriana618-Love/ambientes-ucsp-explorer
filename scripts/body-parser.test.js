const { getBody, getStringifiedBody } = require('./body-parser')
const querystring = require('querystring')
const moment = require('moment')

describe('getBody: Should process all arguments', () => {
	it('test 1', () => {
		const options = {
			campus: 2,
			type: 1,
			room: 188,
			date: moment('2020-05-09', 'YYYY-MM-DD')
		}

		expect(getBody(options)).toEqual(
			expect.objectContaining(
				{
					'hf_tipo': '1',
					'hf_ambiente': '188',
					'ddl_campus': '2',
					'ddl_tipo': '1',
					'ddl_ambiente': '188',
				},
			),
		)

		expect(getBody(options)['__CALLBACKPARAM'].data).toEqual(
			expect.objectContaining({
				'start': '2020-05-04T00:00:00',
				'end': '2020-05-11T00:00:00',
				'days': 7,
				'day': '2020-05-09T00:00:00',
			})
		)
	})

	it('test 2', () => {
		const options = {
			campus: 1,
			type: 2,
			room: 77,
			date: moment('2020-05-11', 'YYYY-MM-DD')
		}

		expect(getBody(options)).toEqual(
			expect.objectContaining(
				{
					'hf_tipo': '2',
					'hf_ambiente': '77',
					'ddl_campus': '1',
					'ddl_tipo': '2',
					'ddl_ambiente': '77'
				},
			),
		)

		expect(getBody(options)['__CALLBACKPARAM'].data).toEqual(
			expect.objectContaining({
				'start': '2020-05-11T00:00:00',
				'end': '2020-05-18T00:00:00',
				'days': 7,
				'day': '2020-05-11T00:00:00',
			})
		)
	})
})

describe('getStringifiedBody: Should match with original', () => {
	it('Test 1', () => {
		const original = "__VIEWSTATE=l9Bp1bcK0yuj0okNk9aR6xd%2Ff9ZB8A0uHEaBMcDk%2BxFt5YyaZoCE2J%2BjCvqDAcs%2B9Le6hQOp7h%2BGaiRz9k5tVagpO1MoO8HByl1QpPA1V%2FPGx86VyLjEVx9O7I%2B9QGXsrkP2e6q%2BFVLohjWnP8ECIPuIdodTAd1n0XDDnlCZ3yLlU2fksoZJ733Opm5bBYUobIqNiALRYCprze%2FlfBWSLpDDX9SvN1SlBPoJZNSo3y30TAl851LEIJ9TTCxUGpAAFw%2B9alke945srZzR2n6%2FpB%2BAvjhVQfxc6B9kGw2OliNwp2stllZFuCIEP976h6CJLSF7QtxZGMGF0mhUpiLHvQN%2BLV8Cng7zT3Pjv6NbB5JBYQZOJOdJSPYgTzHcQ8iPeIfNEZFjbk6R0SOFOe%2FjEZnhqXNhxowGb7ucV7GG0F5vcnlZcdQm0ewmlU26uqnJzOZYqnKZSrbqqMW%2Fd90HFF5wP7RJ7e6cVu%2B63Qi4aaFlSHfzuAb18Z7PYgaq6Otwaj8eE0FpoiMB7FFNpK6fndOoRjCojE%2F77YqYWbbHD06zkMtcWBHb%2BzPH5GWxpBDbtuKm94v6pgOYc2fgm%2FWYffbDXGSpyLYcIuoZl6dHndSKDQ5rxHENatNtOA5la0BRKLbMIEKQmoNNtWpRALUBE4jyYr0d1ePDZfn2lOv6RbcJ16OSedfwLZ0XTGdc6D1f35MNLlznBHPe8Q%2F%2Fku8y3yBZyn%2FNGens2Pbodrqq6WJ91welemQRD6UgzF7GvIDI44GZakkA15CvRPjE5%2F9v8JgB14%2FhQ%2FRRqUpf3doCkauhOEnUkovdT2GsGGL0j4ClDwuak1sxXbHrKP8D8PZ8MKonKJQ1LB0w9d0S%2FX7u2f4lKGUcKlyM8TSrqT8zbMS3mr08OUc%2Fg3GdfdaMTYcufen9AmZ3Bx2TIluCT%2Fc%2FvDH%2BH%2BogpGya7zMOMSTaYSXfI77X2dMCfRa8isLArw%2BUMKy%2BdGTWwwiEAJhcn08DUd1Iedi1cQUHCOFz%2Fi0G10mt94WIbTC%2Fy3WgzNXs8v5MAIo8QPTASSpI6ye57VyREm%2FUHjQqFkmhxsOlhI4Nv7n0V4sqXBObFRL1VtcMwa07GoxH1uWJ2Wt4XI01vFnoR8I7T7qIDR4849xo9HAmqv7TRWv3Er6JJTSOu1oUF6pOXuMuZunOpQW17KTCYaPVZue8js8RgfMZie6qWAKADh2%2B4TzBLV%2Blo1Jcqca9LhsBGvsfEE0pu6hju7KSRI5cFYXKaxJmOrBQvojS6xdF0z68JWd7rgsF6l8hxuNwSz62Dpemh%2BBix4SzAkeYkxo0CKkaZDlqdK%2F7CrennpCwF3vjf7MGXORuvBppFFnFhZ79R%2BoyUtb5uFw%2Fc6YaeIttz94fHKKCtlvfprTjxV5sZWhDdOnMkWRDToUGtviTq8b%2BEyz1wGHuGoOM%2FuCxo%2FUmwGpgNTYdK7gwoUOWoz6lCSkpPlaFhVCvWwaLbQ24trI%2FV2Ieqnphn5gbG1W7X9RzBEZB5Uv6mT7uFPYHPGjIfZgzemZOAm1kVXqa64FEUMZMD6PUVuX0c54xlia3TZL5JNE7YWj0WH%2BpA0sozcahoYFQ2d6SzlNiG7k5K0%2BbQsuP48ABacO%2FGG%2BNDCHwK6Jmzpmpt%2F5zhVpLYnfzVwTuSQcXahGmba%2FZBfcy9KNtb1h028zszNzQszN7HnuAiKNq1GVs6f8GfamVmlHptCr%2F9HJDTFIZHM2V44jZQWigIDTON462E7s3JQSHEcXyZCvjH%2BsRLdVbk62D%2BiLXXjoXMhVOo1ngrDYBXVN3y77W5CF3etVzL%2B4iFPwN4QrgLZY6RbkJJRr8xz7x2Ni3FLcXhvOLiUkBhmM%2BVqc9SJRoh6ejeSmicK92BzWZSmTfoXFJvInA2V004LYgmVdcgEL92lF6fQIR2dsk3yk1X5JPH3OF9ovRwbGaXQvBlWp7Gb1E%2ByrG4UEF1wWQreHXkQwpkXF1VudyGSAsIXto0nNxC3cITbUxj9miIoH3acwdadbHqOXJUfYe%2BGmRLPCOpVZoU8sCmDslJnpdxtIiLROh8ayCsvRlQj9iG4Wt9SWXRmePOF6pVa3NM%2F8oTnuyksK3uz58L2dvhF4zWy5TJ1npXCUJTG6uLEG0jFHu%2Bbm%2FUzmFNx7o9H%2Bso9VvQ1g3JUttrlwTl2346Q%2FtalmvRWh4SivXrqo3ZyZd7%2BK%2FiHpYGkG5yTXn7LSpCRfmjBMrEfcvnEKhSDrt1hegVLNjzs13VFlzrGa1ZZ6JUgic2Bd0kLFuf%2BT4%2BJQmovZRQaOX7G7XYwFkyXKG2%2FNxXWEZTmKujyptlnnrZYXRUIYRIY%2Fgzi3v94l5KuzZ221nJ7%2BOEinFT%2BaD5Dq4nqYWB46mJ8YvNWlrLXQcCtQLJTbUEi97HMqQR2CNm2rjPfZZe2838Er1G2rEFsXDBr1OwbKE8JaBoMmYTbIHThvxwbEOX9kd0xhKH30Mr0%2F7BQroaNhvaiqPthlJRLAdk%2BV%2BrzBdWd%2Bc1b%2FSCEsjf5Bgixo2nw0l9dmfmSHn0Xu92CShyaflSRgBoXpu2YSKKZujnPCnauBTYZi3UbhUhajPM8Pxj0dNsMo%2B8XO6%2FTdpPyefhdffRI577HdeYJ7RrQ%2BSn1m%2BXNakMNx3PINm3qlVbWd4NiedBgErbJQCQWF2HJsf0RkEJCTOW5mEFEOlsb%2BarAPbi0VaY6uEx%2FoFAHeFexBjpxtMqSGw8K0%2FswpgvIGPfSQ126yRWNRljBn8txxVTGriao7a8kk95Y1diAZy4%2FKFvp3lvLEgp5NGL08IcO6Nly0SmtUrhTP2CCbXiRHWcihYrO8GSvkw6Gs%2FsF2Pfacf3VMGHlQFF4xEtDrNao9%2F9wU8hccp%2FhU%2FybPsSLbXwSHQJ3TiX9yiwGRi7KWClrGjDobf2TFg28yXDma8xkj%2BqG7jmbvYxeiB45F1Nu1PrGtFB8u6xLyjdVxWec1VdpIzCKYz7M3611vXxvwaa6lz2BHC5oN8kGOoJVGb1Nptu2LGyQs8UQDojDSwI5m7z6wkiDLMYxdcXLjkGOkDxB%2FnijqOYOmpeiORjL4VsEf9rr3NXgQPvlCMqR6YdM91EG34pKAhhaY5Lg%2FzFMzA%2FMZtPP3fUdj8h23VXGvdCqAZkREiQHkXv7nP3dsXnYnzQKq9Ee5uSc3Mo8OKBRAf%2Bped4ZcnrfgmaQlCUUVVHl36deP9Ecf%2Fgd%2FYK7ZzGVxRMnxiaB3pP0GMLYEZ2Ew48yuuuijlDn1uuMo%2B2zD7XXIc4pdpjfIgrM6sGAa%2FIumP8rteOU6WzxE0twQ4n97gslBVSGmGGtcqCwLxO34dCzTqkHtDyby8jK2pnV%2BhxDkOOD0o2XxK0k%2BjCLNlBQ1TsYDbbl%2BX55HeLI2GUD6LrMQ8DO62zbvPjHkt6if3VN5vu1qS1Oq4pQRDs%2Fc7M7XSv%2BDy77%2FMS3HyyttZEoHvckpkkYneNhyiBx7m9gq%2BnvyuKzMvXuaruH0D5nXXMLPdIdoWSeAAhYQbFHDP5oO8h7UiS6pywEnzx5eKpDvKEchBtuUTAyhfIXNDceYEefYsitM1%2FqVoGg48wIsvzGzoCA7y%2BloCSvVCyWKEEPHShOcKWhLbonaitQ1g6BZCb%2F8ic0qV4NO7QkWbBI5SlL0LYctJ2X%2Fbzx1DTjSeMkIpQ7w3SbnOHLFbJDJQvafII%2FhWOdhweHoGBjQBtPmu7VBBwGiPHKn0eenRyZOsCoId8m7g01Dyn0qdSACZTLVcYIwfAWrSjTAcAQzHkNHIVc4WcECJh%2BB8p29r3UhVgg1Bh%2FJHM2irImkPCSo3k04YlIlgtVihTJND%2BkvRG42vtAsitKgLDdA1jUaT%2F5u%2Fnur4MnOVj6f0Awt4GqtyzvYkri5Bi4kmXZFAT4u0eA5JTTQKYmBkGRrSIwY7vJb0tm%2BCUJ%2B%2BThDEF4rsWMlcBYf3ZSw7kBAe8G0Zvmq3iPg9vvJgDqt3OnmwwotR4uKeuCjlFvIALN8J8HOvAcoqOsqWxmecbpZIBdACPbXTOD1e9V1ub0NbaqXru1CK8TL3DGJbdb9qj9Q6G%2B%2FXJIk6ycPEYSrhUADM70S%2BmV7OUR795A%2Ff5IRnWAlukTRWWZrDnsXws1XBzwWZY7REF0PTlpikWeG%2Fvi9cNQ197vyANqOGMc0Nyz4%2FkeMYJyDCN%2Fl5RLwOcS57iqbpvhxkS%2FjJCW5RwVAoLChG5%2B6Ol3CKOulH%2B59jjwEtq5w%2FuS6QmNoOrXRafunQsvp4hTOgFnOGlztM%2BmEX5rwD8XGXC6RV61BtehhnVlHRQHuyvn9GSSj8v%2BIKmcDQ6O%2BmNP29t0Ozg%2BkMig1FsOEBe4tv2ia8h5XHzKzK8O%2FS%2FAGZ5Xk3Zkhb14REyZXRFKAy0NrYlDtiDR9mMmrPABrT%2B7gYYAc1u9iql9NWLaOAv9kFYNWUdqimU7sVPsDx8cm%2BY8hygZIgMzEVqCUS%2BGLBZiMHkWjknzX%2BGLv%2BbZ3Uf9NhcUmNttNJnioVCWEmvDbbA%2FqProcrtU4VjDslOkt5X59PW%2BlcJeQS&__VIEWSTATEGENERATOR=980642AA&__EVENTTARGET=&__EVENTARGUMENT=&hf_fecha=08%2F08%2F2020&hf_tipo=1&hf_ambiente=188&ddl_campus=2&ddl_tipo=1&ddl_ambiente=188&dp_navigator_state=&__CALLBACKID=dp_calendar&__CALLBACKPARAM=JSON%7B%22action%22%3A%22Command%22%2C%22type%22%3A%22CallBack%22%2C%22parameters%22%3A%7B%22command%22%3A%22navigate%22%7D%2C%22data%22%3A%7B%22start%22%3A%222020-05-04T00%3A00%3A00%22%2C%22end%22%3A%222020-05-11T00%3A00%3A00%22%2C%22days%22%3A7%2C%22day%22%3A%222020-05-09T00%3A00%3A00%22%7D%2C%22header%22%3A%7B%22v%22%3A%221850%22%2C%22control%22%3A%22dpc%22%2C%22id%22%3A%22dp_calendar%22%2C%22clientState%22%3Anull%2C%22columns%22%3A%5B%7B%22Value%22%3Anull%2C%22Name%22%3A%22lunes%2C%2004%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-04T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22martes%2C%2005%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-05T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22mi%C3%A9rcoles%2C%2006%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-06T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22jueves%2C%2007%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-07T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22viernes%2C%2008%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-08T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22s%C3%A1bado%2C%2009%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-09T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%2C%7B%22Value%22%3Anull%2C%22Name%22%3A%22domingo%2C%2010%20de%20mayo%20de%202020%22%2C%22ToolTip%22%3Anull%2C%22Date%22%3A%222020-05-10T00%3A00%3A00%22%2C%22Children%22%3A%5B%5D%7D%5D%2C%22days%22%3A7%2C%22startDate%22%3A%222020-05-04T00%3A00%3A00%22%2C%22cellDuration%22%3A15%2C%22cssOnly%22%3Atrue%2C%22cssClassPrefix%22%3A%22calendar_default%22%2C%22heightSpec%22%3A%22BusinessHoursNoScroll%22%2C%22businessBeginsHour%22%3A7%2C%22businessEndsHour%22%3A22%2C%22viewType%22%3A%22Week%22%2C%22dayBeginsHour%22%3A0%2C%22dayEndsHour%22%3A0%2C%22headerLevels%22%3A1%2C%22backColor%22%3A%22%23FFFFD5%22%2C%22nonBusinessBackColor%22%3A%22%23FFF4BC%22%2C%22eventHeaderVisible%22%3Afalse%2C%22timeFormat%22%3A%22Clock12Hours%22%2C%22timeHeaderCellDuration%22%3A60%2C%22locale%22%3A%22en-us%22%2C%22showAllDayEvents%22%3Afalse%2C%22weekStarts%22%3A1%2C%22hourNameBackColor%22%3A%22%23ECE9D8%22%2C%22hourFontFamily%22%3A%22Tahoma%22%2C%22hourFontSize%22%3A%2216pt%22%2C%22hourFontColor%22%3A%22%23000000%22%2C%22selected%22%3A%5B%5D%2C%22hashes%22%3A%7B%22hours%22%3A%2217FBBzV%2FvwO7g%2BDqf7FDcDr9hao%3D%22%2C%22callBack%22%3A%22kLQ%2FHvzBZ5dUMEYiG7DFnn1rMMc%3D%22%2C%22corner%22%3A%22XpLeJTKeDdsTx8M9WrJh%2BXLvb%2B4%3D%22%2C%22columns%22%3A%22J6qnI1pp6b4PNPe1J3sznJ%2FAVC8%3D%22%2C%22events%22%3A%22GaK5ho7XWHGq%2F9R6FX5C6WJdEqw%3D%22%2C%22colors%22%3A%22%2FasRMoHKKv4ajaGnf53KWG9K%2B3g%3D%22%2C%22selected%22%3A%22l9Fw4VUO7kr8CvBlt4zaMCqXZ0w%3D%22%7D%7D%7D"
		const options = {
			campus: 2,
			type: 1,
			room: 188,
			date: moment('2020-05-09', 'YYYY-MM-DD')
		}

		expect(querystring.parse(getStringifiedBody(options)))
		.toEqual(querystring.parse(original))
	})
})
