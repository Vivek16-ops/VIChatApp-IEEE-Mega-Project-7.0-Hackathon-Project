import toast from 'react-hot-toast'

const useAddFriendHook = () => {
    const InvokeAddFriendAPIFunction = async (friendID, setfriendRequestSendLoading) => {
        const chekcedInput = handleInputError(friendID);
        if (!chekcedInput) {
            return
        }
        try {
            setfriendRequestSendLoading(true)
            const response = await fetch("/api/users/addUserFriend", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendUsername: friendID }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success(result.message)
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setfriendRequestSendLoading(false)
        }
    }

    const InvokeFriendRequestAPIFunction = async () => {
        try {
            const response = await fetch("/api/users/friendRequestsFunction", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.success) {
                return result.pendingFriends
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const InvokeAcceptRejectRequestFunction = async (friendUsername, userAction, setFriendRequests) => {
        try {
            const response = await fetch("/api/users/acceptRejectFriendRequestFunction", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendUsername: friendUsername, status: userAction }),
            });

            const result = await response.json();
            if (result.success) {
                if(userAction === 'accepted') {
                    toast.success("Friend request accepted! Kindly Refresh the page")
                }
                else {
                    toast.error("Friend request rejected! Kindly Refresh the page")
                }
            }
            else {
                toast.error(result.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    return {
        InvokeAddFriendAPIFunction, InvokeFriendRequestAPIFunction, InvokeAcceptRejectRequestFunction
    }
}

function handleInputError(friendID) {
    if (friendID === '') {
        toast.error("Please mention user ID you want to add as a friend")
        return false
    }
    return true
}

export default useAddFriendHook