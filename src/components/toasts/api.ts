// Helper to display toast notifications based on GraphQL API responses
import { GraphQLResponse } from "@/modules"
import { addToast } from "@heroui/toast"

// Show a toast depending on whether the GraphQL response was successful or not
export const showGraphQLToast = <T>(response: GraphQLResponse<T>) => {
    const { success, message } = response

    const description =
        message || (success ? "Operation completed." : "Something went wrong.")

    addToast({
        title: success ? "Success" : "Error",
        description,
        color: success ? "success" : "danger",
    })
}

// Show a toast when the user is not authorized to access a resource
export const showUnauthorizedToast = () => {
    addToast({
        title: "Unauthorized",
        description: "You are not authorized to access this resource.",
        color: "danger",
    })
}

// Execute an API action and automatically show a toast based on the result
export const runGraphQLWithToast = async <T>(
    action: () => Promise<GraphQLResponse<T>>,
) => {
    try {
        const response = await action()
        showGraphQLToast(response)
    } catch (error) {
        const _error = error as Error
        if (_error.message.toLowerCase().includes("unauthorized")) {
            showUnauthorizedToast()
        }
    }
}