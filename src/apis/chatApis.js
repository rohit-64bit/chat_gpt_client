import { errorHandler, apiOptions } from "../utils/common"

const apiPrefix = "chats/"

const handleFetchChats = async () => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}`), {
            method: 'GET',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to fetch chats');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleEditChat = async ({ id, title }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}${id}`), {
            method: 'PUT',
            headers: apiOptions.headers,
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to edit chat');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleDeleteChat = async ({ id }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}${id}`), {
            method: 'DELETE',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to delete chat');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handlePostChat = async ({ flag, projectID, message }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}${flag}/${projectID}`), {
            method: 'POST',
            headers: apiOptions.headers,
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to post chat');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const getMessages = async ({ chatID }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}messages/${chatID}`), {
            method: 'GET',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to fetch messages');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

export { handleFetchChats, handleEditChat, handleDeleteChat, handlePostChat, getMessages }