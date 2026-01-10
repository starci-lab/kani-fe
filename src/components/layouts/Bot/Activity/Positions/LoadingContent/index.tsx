import React from "react"

export const LoadingContent = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="text-sm">No results found</div>
            <div className="text-xs text-foreground-500">No positions found</div>
        </div>
    )
}