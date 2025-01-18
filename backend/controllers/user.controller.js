import User from "../models/user.model.js"

export const addUserFriendsFunction = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        const { friendUsername } = await req.body;

        const loggedInUser = await User.findById(loggedInUserID);

        const friend = await User.findOne({ userName: friendUsername });

        if (!loggedInUser || !friend) {
            return res.json({ success: false, message: 'User not found! Please check username or remove extra space at the end or beginning. Try Again' });
        }
        const existingFriend = loggedInUser.friends.find(f => f.friendId.equals(friend._id));

        if (existingFriend) {
            if (existingFriend.status === 'accepted') {
                return res.json({ success: true, message: 'This user is already in your added friend list' });
            } else if (existingFriend.status === 'rejected' || existingFriend.status === 'sent') {
                existingFriend.status = 'sent';

                const friendRecord = friend.friends.find(f => f.friendId.equals(loggedInUserID));
                if (friendRecord) {
                    friendRecord.status = 'pending';
                }
                await loggedInUser.save();
                await friend.save();

                return res.json({ success: true, message: 'Friend request re-sent' });
            } else if (existingFriend.status === 'pending') {
                return res.json({ success: false, message: 'Your friend request is pending. Please wait for the other user to respond.' });
            }
        } else {
            loggedInUser.friends.push({ friendId: friend._id, status: 'sent' });

            friend.friends.push({ friendId: loggedInUserID, status: 'pending' });

            await loggedInUser.save();
            await friend.save();

            return res.json({ success: true, message: 'Friend request sent' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const friendRequestsFunction = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        const loggedInUser = await User.findById(loggedInUserID).select('friends').populate('friends.friendId', 'userName');

        const pendingFriends = loggedInUser.friends.filter(friend => friend.status === 'pending');

        const pendingFriendsUsernames = pendingFriends.map(friend => ({ username: friend.friendId.userName }));

        return res.json({
            success: true,
            pendingFriends: pendingFriendsUsernames
        });
    } catch (error) {
        return res.json({
            success: false,
            message: 'Error while fetching friends request'
        });
    }
};

export const acceptRejectFriendRequestFunction = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;
        const { friendUsername, status } = req.body;

        const friend = await User.findOne({ userName: friendUsername });

        if (!friend) {
            return res.json({
                success: false,
                message: 'Friend not found'
            });
        }

        await User.updateOne(
            { _id: loggedInUserID, 'friends.friendId': friend._id },
            { $set: { 'friends.$.status': status } }
        );

        await User.updateOne(
            { _id: friend._id, 'friends.friendId': loggedInUserID },
            { $set: { 'friends.$.status': status } }
        );

        return res.json({
            success: true,
            message: 'Friend request status updated successfully'
        });
    } catch (error) {
        console.log("Error while updating friend request status", error.message);
        return res.json({
            success: false,
            message: 'Error while updating friend request status'
        });
    }
};

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        // Retrieve the logged-in user with their friends
        const loggedInUser = await User.findById(loggedInUserID).select('friends').populate('friends.friendId', '-Password');

        // Filter friends whose status is pending
        const pendingFriends = loggedInUser.friends.filter(friend => friend.status === 'accepted');

        // Map to get friend details without password
        const pendingFriendsDetails = pendingFriends.map(friend => ({
            _id: friend.friendId._id,
            friendId: friend.friendId._id,
            fullName: friend.friendId.fullName,
            userName: friend.friendId.userName,
            email: friend.friendId.email,
            Gender: friend.friendId.Gender,
            profilePic: friend.friendId.profilePic
        }));

        return res.json({
            success: true,
            usersInfo: pendingFriendsDetails
        });
    } catch (error) {
        return res.json({
            success: false,
            message: 'Error while getting users detail'
        });
    }
};