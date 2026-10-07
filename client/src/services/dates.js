const formatTime = (time) => {
    const hours = Math.floor(time / 100)
    const minutes = String(time % 100).padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 === 0 ? 12 : hours % 12

    return `${displayHours}:${minutes} ${period}`
}

const formatUnit = (value, unit) => `${value} ${unit}${value === 1 ? '' : 's'}`

const hasPassed = (remaining) => {
    const { years = 0, months = 0, days = 0 } = remaining || {}

    return years < 0 || months < 0 || days < 0
}

const formatRemainingTime = (remaining) => {
    const { years = 0, months = 0, days = 0 } = remaining || {}

    if (hasPassed(remaining)) return 'Event has passed!'

    const parts = []
    if (years > 0) parts.push(formatUnit(years, 'year'))
    if (months > 0) parts.push(formatUnit(months, 'month'))
    if (days > 0) parts.push(formatUnit(days, 'day'))

    return parts.length > 0 ? parts.join(', ') : 'Today!'
}

export default {
    formatTime,
    formatRemainingTime,
    hasPassed
}
