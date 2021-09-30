
const dateAndtime = (inputString) => {
    let date = new Date(inputString)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    return `${day}/${month}/${year}-${hour}:${minute}`
}

function datetimeLocalToTimestamp(inputString) {
    return Date.parse(inputString)
}

function timestampToDatetimeLocal(timestamp) {
    return new Date(timestamp).toISOString().split(":00.000Z")[0]
}

function nowToDatetimeLocal() {
    return new Date().toISOString().slice(0, 16)
}

module.exports = { dateAndtime, datetimeLocalToTimestamp, timestampToDatetimeLocal, nowToDatetimeLocal }