import React from 'react'

const AIResponseSkeleton = () => {
    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-6 w-28"></div>
            <div className="skeleton h-4 w-auto"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-auto"></div>
        </div>
    )
}

export default AIResponseSkeleton
