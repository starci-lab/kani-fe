import React, { PropsWithChildren } from "react"

export const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="mx-auto p-6 max-w-[1024px] w-full">  
            {children}
        </div>
    )
}