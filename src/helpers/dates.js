
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

function remainingTimeBetweenNowAndDate(startTime) {
    const today = new Date();
    const Christmas = new Date(startTime);
    const diffMs = (Christmas - today); // milliseconds between now & Christmas
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes"
}



module.exports = {
    dateAndtime,
    datetimeLocalToTimestamp,
    timestampToDatetimeLocal,
    nowToDatetimeLocal,
    remainingTimeBetweenNowAndDate
}