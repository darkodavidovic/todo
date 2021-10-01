
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
    return new Date(timestamp).toISOString().slice(0, 16)
    // return new Date(timestamp).toISOString().split(":00.000Z")[0]
}

function nowToDatetimeLocal() {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const time = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 16);
    return time
}

function remainingTimeBetweenTwoDates(startTime, endTime) {
    const start = new Date(startTime);
    const and = new Date(endTime);
    const diffMs = (start - and); // milliseconds between now & start
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes"
}

function remainingTimeBetweenNowAndDate(startTime) {
    const start = new Date(startTime);
    const and = new Date();
    const diffMs = (start - and); // milliseconds between now & start
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes"
}

//2021-10-01
const dateOnlySlice = (date) => {
    let input = date.split("-")
    const yyyy = input[0]
    const mm = input[1]
    const dd = input[2]
    const t = yyyy + "-" + mm + "-" + dd
    return t.slice(0, 10)
}

// dd/mm/yyyy 00:00
const timeAndDateFormated = (string) => {
    let date = string.split("T")[0].split("-")
    let time = string.split("T")[1]
    const yyyy = date[0]
    const mm = date[1]
    const dd = date[2]
    const t = dd + "/" + mm + "/" + yyyy + " " + time
    return t
}


module.exports = {
    dateAndtime,
    datetimeLocalToTimestamp,
    timestampToDatetimeLocal,
    nowToDatetimeLocal,
    remainingTimeBetweenNowAndDate,
    remainingTimeBetweenTwoDates,
    dateOnlySlice,
    timeAndDateFormated
}