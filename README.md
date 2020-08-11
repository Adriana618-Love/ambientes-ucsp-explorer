# Ambientes UCSP Explorer
Este es la parte backend de la aplicacion ambientes UCSP. 

# Peticiones

## Obtener salas disponibles en un tiempo
GET en `rooms/available`
Con parametros 
* day: Dia de consulta, en formato YYYY-MM-DD
* hour: Hora de la consulta, en formato HH:MM:SS

Ejemplo:

`localhost:3000/rooms/available?day=2020-05-07&hour=8:30:00`

Retorna:
``` json
[
    "Módulo Biblioteca 1  (Cap.: 6)",
    "Módulo Biblioteca 2  (Cap.: 6)",
    "N204  (Cap.: 12)",
    "N210  (Cap.: 12)",
    "N308  (Cap.: 35)",
    "N310  (Cap.: 12)",
    "N413  (Cap.: 35)",
    "Sala de Consejo  (Cap.: 4)",
    "N04 (Lab. E. C.)  (Cap.: 10)",
    "N412  (Cap.: 25)",
    "P103  (Cap.: 30)"
]
```
