const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
	username: { type: String, required: true, max: 100 },
	email: { type: String, required: true, max: 100 },
	password: { type: String, required: true }
})

const usuarios = mongoose.model('usuarios', UsuarioSchema)
