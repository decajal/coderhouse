const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const alumnos = []

app.use(express.static('public'))

httpServer.listen(3000, () => console.log(`Server on Port ${3000}`))

io.on('connection', (socket) => {
	console.log('Un alumno se conecto!')
	socket.emit('alumnos', alumnos)

	socket.on('agregarAlumno', data => {
		alumnos.push(data)
		io.sockets.emit('alumnos', alumnos)
	})
})
