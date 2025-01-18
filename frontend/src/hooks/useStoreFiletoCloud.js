import React, { useState } from "react"
import toast from 'react-hot-toast'

const useUploadFileToCloudHook = () => {
    const [cloudUploadLoading, setcloudUploadLoading] = useState(false)

    const UploadFileToCloudAPICall = async (recievedfile) => {
        setcloudUploadLoading(true)
        try {
            // way to send a file in backend 
            const formData = new FormData();
            formData.append('file', recievedfile);

            const response = await fetch("/api/fileuploadtocloud/cloudStorage", {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message)
                return result.attachment_link
            } else {
                toast.error(result.message)
                return null
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setcloudUploadLoading(false)
        }
    }

    return {
        UploadFileToCloudAPICall, cloudUploadLoading
    }
}

export default useUploadFileToCloudHook