import React from "react";

const useDropBoxTokenRegeneration = () => {
    const dropboxTokenRegnerationFunction = async () => {
        try {
            const response = await fetch("/api/fileuploadtocloud/cloudTokenRegeneration", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
        } catch (error) {
            console.log("Cloud token regeneration error Please try again")
        }
    }
    return { dropboxTokenRegnerationFunction }
}

export default useDropBoxTokenRegeneration