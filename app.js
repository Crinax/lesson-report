const express = require('express')
const app = express()
const color = require('./colors')
const API = require('./api/api')
const Logger = require('./logger/logger')
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
// Корневой маршрут
app.get('/', async (req, res) => {
    var isRequsetQueryEmpty = Object.keys(req.query).length !== 0
    var result = await API.getFormatedLessons(isRequsetQueryEmpty ? req.query : req.body)
    Logger.appendLog('Express => Sent:' + JSON.stringify(result, null, 4))
    if (result.status == 'error') {
        res.status(result.code).send(result)
    } else { res.json(result) }
})
// POST-запрос на добавление новых уроков
app.post('/lessons', async (req, res) => {
    var result = await API.sendLessons(req.body)
    Logger.appendLog('Express => Sent:' + JSON.stringify(result, null, 4))
    if (result.status == 'error') {
        res.status(result.code).send(result)
    } else { res.json(result) }
})
app.listen(process.env.PORT, () => {
    console.clear()
    console.log(`${color.bright}${color.fgYellow}Listening port: ${process.env.PORT}${color.reset}\n`)
    API.connect().then(() => {
        console.log(`${color.bright}${color.fgGreen}Connected successfully${color.reset}\n`)
    })
})
app.on('exit', () => {
    DB.disconnect()
})