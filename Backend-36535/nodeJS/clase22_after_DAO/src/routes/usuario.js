const { Router } = require('express')
const userRouter = Router()

// const { UserDaoMongo } = require('../daos/usuarios/UsuarioDaoMongo')
// const userDao = new UserDaoMongo()

const { UserDaoFirestore } = require('../daos/usuarios/UsuarioDaoFirestore')
const userDao = new UserDaoFirestore()

userRouter.get('/', async (req, res) => {
	let users = await userDao.getAll()
	res.json({ status: 'OK!', users })
})

userRouter.get('/:id', async(req, res) => {
	let { id } = req.params
	let user = await userDao.getById(id)
	res.json({ status: 'OK!', user })
})

userRouter.post('/', async (req, res) => {
	let user = req.body

	if(user && user.username && user.email && user.password){
		user = userDao.saveUser(user)
		res.json({result: 'User Saved', user})
	}else {
		res.json({ result: 'User  cant saved' })
	}
})

userRouter.delete('/:id', async (req, res) => {
	let { id } = req.params
	let user = await userDao.delete(id)
	res.json({ result: 'OK!', user_deleted: user })
})

userRouter.put('/:id', async (req, res) => {
	let user = req.body	
	let response = userDao.updateUser(user, req.params.id)
})

module.exports = userRouter
