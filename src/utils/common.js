const apiOptions = {
    url: (prefix) => `${import.meta.env.VITE_API_URL}${prefix}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'x-client-id': `${localStorage.getItem('clientID')}`
    }
}

const errorHandler = (error) => {
    console.error(error)
    throw new Error(error.message || 'An error occurred')
}

export { apiOptions, errorHandler }