const fs = require('fs')
module.exports = class Logger {
    static logFile = "./logs.txt"
    static i = 1
    static init() {
        fs.writeFileSync(Logger.logFile, '')
    }
    static clearFile() {
        Logger.init()
    }
    static appendLog(msg) {
        fs.appendFileSync(Logger.logFile, `${Logger.i} -> ${msg}\n`)
        Logger.i++
    }
}