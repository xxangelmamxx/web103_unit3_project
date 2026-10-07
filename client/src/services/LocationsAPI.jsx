const getAllLocations = async () => {
    const response = await fetch('/api/locations')
    if (!response.ok) throw new Error(`Failed to fetch locations (${response.status})`)
    return response.json()
}

const getLocationById = async (id) => {
    const response = await fetch(`/api/locations/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch location ${id} (${response.status})`)
    return response.json()
}

const getEventsByLocation = async (id) => {
    const response = await fetch(`/api/locations/events/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch events for location ${id} (${response.status})`)
    return response.json()
}

export default {
    getAllLocations,
    getLocationById,
    getEventsByLocation
}
