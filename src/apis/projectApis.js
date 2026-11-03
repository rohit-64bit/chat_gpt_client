import { errorHandler, apiOptions } from "../utils/common"

const apiPrefix = "projects/"

const handleCreateProject = async ({ title }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}`), {
            method: 'POST',
            headers: apiOptions.headers,
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Project creation failed');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleFetchProjects = async () => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}`), {
            method: 'GET',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Failed to fetch projects');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleUpdateProject = async ({ id, title }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}${id}`), {
            method: 'PUT',
            headers: apiOptions.headers,
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Project update failed');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

const handleDeleteProject = async ({ id }) => {

    try {

        const res = await fetch(apiOptions.url(`${apiPrefix}${id}`), {
            method: 'DELETE',
            headers: apiOptions.headers
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            throw new Error(data.message || 'Project deletion failed');
        }

        return data;

    } catch (error) {
        errorHandler(error)
    }

}

export { handleCreateProject, handleFetchProjects, handleUpdateProject, handleDeleteProject }