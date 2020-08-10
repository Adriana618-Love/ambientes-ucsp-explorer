const { getRoomData, getSchedule } = require('./scripts/get-schedule')
const moment = require('moment')


const roomData = getRoomData('N419  (Cap.: 24)')

const options = {
	...roomData,
	date: moment('2020-05-09', 'YYYY-MM-DD')
}

return getSchedule(options)
	.then(console.log)
	date: moment('2020-05-07', 'YYYY-MM-DD')
}

function isFree(value) {
	console.log("Número de Eventos " + Object.keys(value['Events']).length);
	var flag = true;
	const current_hour = moment("13:00:00","HH:mm:ss").format('HH:mm:ss');//Hora de prueba
	//const current_hour = moment().format("HH:mm:ss");
	var near = moment("23:59:59","HH:mm:ss").format('HH:mm:ss');
	for(var i in value['Events']){
		const date  = moment(new Date(value['Events'][i]['start']+'Z')).format("YYYY-MM-DD");
		if(date==='2020-05-07'){
			const start = moment(new Date(value['Events'][i]['start'])).format("HH:mm:ss");
			const end = moment(new Date(value['Events'][i]['end'])).format("HH:mm:ss");
			if(current_hour>=start && current_hour<end){
				flag=false;
				near=start;
				console.log("Match con:")
				console.log("Dia " + value['Events'][i]['start']);
				console.log("Horas : " + value['Events'][i]['text']);
			}
			else{
				if(current_hour<start && near>start){
					near=start;
				}
			}
		}
	}
	if(flag)console.log("Aula libre hasta "+near);//Aún bastante cutre... :-(
	else console.log("Aula ocupada hasta "+near);
}

return getSchedule(options)
	.then(isFree);
