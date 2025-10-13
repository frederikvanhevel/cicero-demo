type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown
    responseType?: 'json' | 'blob' | 'text' | 'arrayBuffer'
}

// Create an auth event emitter to handle auth-related events
export const authEvents = new EventTarget()

export class ApiError extends Error {
    code: string

    constructor(
        public status: number,
        message: string,
        code: string
    ) {
        super(message)
        this.name = 'ApiError'
        this.code = code
    }
}

async function handleResponse<T>(
    response: Response,
    responseType: 'json' | 'blob' | 'text' | 'arrayBuffer' = 'json'
): Promise<T> {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: 'An error occurred' }))

        // If we get a 401 Unauthorized error, dispatch an auth event
        if (response.status === 401) {
            authEvents.dispatchEvent(new CustomEvent('unauthorized'))
        }

        throw new ApiError(response.status, error.message, error.code)
    }

    switch (responseType) {
        case 'blob':
            return response.blob() as Promise<T>
        case 'text':
            return response.text() as Promise<T>
        case 'arrayBuffer':
            return response.arrayBuffer() as Promise<T>
        case 'json':
        default:
            return response.json() as Promise<T>
    }
}

export async function api<T>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const { body, headers, responseType = 'json', ...rest } = options

    const requestOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        credentials: 'include',
        ...rest
    }

    if (body) {
        // Only stringify if Content-Type is application/json
        if (
            requestOptions.headers &&
            (requestOptions.headers as Record<string, string>)[
                'Content-Type'
            ] === 'application/json'
        ) {
            console.log('body', body)
            requestOptions.body = JSON.stringify(body)
        } else {
            requestOptions.body = body as BodyInit
        }
    }

    const response = await fetch(url, requestOptions)
    return handleResponse<T>(response, responseType)
}

// Convenience methods
export const apiClient = {
    get: <T>(url: string, options?: Omit<RequestOptions, 'body'>) =>
        api<T>(url, { method: 'GET', ...options }),

    post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        api<T>(url, { method: 'POST', body, ...options }),

    put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        api<T>(url, { method: 'PUT', body, ...options }),

    patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        api<T>(url, { method: 'PATCH', body, ...options }),

    delete: <T>(url: string, options?: RequestOptions) =>
        api<T>(url, { method: 'DELETE', ...options })
}
