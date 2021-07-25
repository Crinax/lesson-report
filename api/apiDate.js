module.exports = class APIDate {
    constructor(date) {
        this.date = date
        return this
    }
    init(date) {
        this.date = date
        return this
    }
    get nextYear() {
        var next = new Date(this.date)
        next.setFullYear(next.getFullYear() + 1)
        this.init(next.toISOString().slice(0, 10))
        return this
    }
    isValid(regex = null) {
        if (isNaN(Date.parse(this.date))) {
            return false
        }
        else if (regex != null) {
            if (this.date.match(regex) == null) {
                return false
            }
        }
        return true
    }
    rangeToDate(date, ...daysOfWeek) {
        if (!(new APIDate(date)).isValid()) {
            return 'Date is invalid'
        }
        else {
            var result = []
            var nextDate = new Date(this.date)
            date = new Date(date)
            while (nextDate <= date) {
                if (daysOfWeek.length == 0) {
                    result.push(nextDate.toISOString().slice(0, 10))
                }
                else {
                    daysOfWeek.forEach(day => {
                        if (nextDate.getDay() == day) {
                            result.push(nextDate.toISOString().slice(0, 10))
                        }
                    })
                }
                nextDate.setDate(nextDate.getDate() + 1)
            }
            return result
        }
    }
    rangeByCount(count, ...daysOfWeek) {
        var nextDate = new Date(this.date)
        var result = []
        var i = 0
        while (i < count) {
            if (daysOfWeek.length == 0) {
                result.push(nextDate.toISOString().slice(0, 10))
                i++
            }
            else {
                daysOfWeek.forEach(day => {
                    if (nextDate.getDay() == day) {
                        result.push(nextDate.toISOString().slice(0, 10))
                        i++
                    }
                })
            }
            nextDate.setDate(nextDate.getDate() + 1)
        }
        return result
    }
}