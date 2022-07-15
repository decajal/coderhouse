import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
const server = app.listen((8080), () => console.log("Server Up"))

const users = []

app.use(express.json())
app.use(express.static('public'))

