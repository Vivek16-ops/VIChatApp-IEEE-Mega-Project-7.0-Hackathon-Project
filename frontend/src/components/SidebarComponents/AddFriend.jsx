import React, { useState, useEffect } from 'react';
import useAddFriendHook from '../../hooks/AddFriend';

const AddFriends = () => {
  const [username, setUsername] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]) // Example friend requests
  const [showNotifications, setShowNotifications] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [friendRequestSendLoading, setfriendRequestSendLoading] = useState(false);

  const { InvokeAddFriendAPIFunction, InvokeFriendRequestAPIFunction, InvokeAcceptRejectRequestFunction } = useAddFriendHook();

  const fetchFriendRequests = async () => {
    const response = await InvokeFriendRequestAPIFunction()
    setFriendRequests(response)
  }
  useEffect(() => {
    fetchFriendRequests()
  }, []);

  useEffect(() => {
    if (friendRequests.length === 0) {
      setShowNotifications(false);
    } else {
      setShowNotifications(true);
    }
  }, [friendRequests]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await InvokeAddFriendAPIFunction(username, setfriendRequestSendLoading);
    setUsername('');
  }

  const toggleAddFriend = () => {
    setIsAdding(!isAdding);
  }

  const handleAccept = async (username) => {
    await InvokeAcceptRejectRequestFunction(username, 'accepted')
    setFriendRequests(friendRequests.filter(request => request.username !== username));
  }

  const handleReject = async (username) => {
    await InvokeAcceptRejectRequestFunction(username, 'rejected')
    setFriendRequests(friendRequests.filter(request => request.username !== username));
  }

  const handleMinimize = () => {
    setMinimized(true);
  }

  const handleMaximize = () => {
    setMinimized(false);
  }

  return (
    <div>
      {/* Notification Container */}
      {showNotifications && (
        minimized ? (
          <div className='py-2 flex items-center justify-center bg-blue-100 text-black rounded shadow mb-4' style={{ height: '40px' }}>
            <div onClick={handleMaximize} className='relative cursor-pointer'>
              <span className='text-black'>🔔</span>
              <span className='absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-green-500 rounded-full'>•</span>
            </div>
          </div>
        ) : (
          <div className='py-2 flex flex-col bg-blue-100 text-black rounded shadow mb-4 relative'>
            <div className='flex flex-col'>
              {friendRequests.map((request, index) => (
                <div key={index} className='p-2 flex flex-col md:flex-row items-center justify-between'>
                  <span>{request.username}</span>
                  <div className='mt-2 md:mt-0'>
                    <button
                      onClick={() => handleAccept(request.username)}
                      className='px-2 py-1 mr-2 bg-green-500 text-white rounded-full shadow'
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request.username)}
                      className='px-2 py-1 bg-red-500 text-white rounded-full shadow'
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleMinimize}
              className='absolute top-0 right-0 p-2 flex items-center justify-center text-black font-bold'
              style={{ width: '10px', height: '10px', lineHeight: '1' }}
            >
              ×
            </button>
          </div>
        )
      )}

      {/* Add Friend Section */}
      <div className='py-2 flex flex-col overflow-auto bg-transparent text-black'>
        {!isAdding && (
          <button
            onClick={toggleAddFriend}
            className='p-2 mb-2 flex items-center justify-center bg-green-500 text-white rounded shadow'
          >
            <span className="mr-2">+</span> Add Friend
          </button>
        )}
        {isAdding && (
          <div className='relative'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
              <input
                type="text"
                placeholder={friendRequestSendLoading ? "Please wait, request is sending..." : "Enter username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='mt-2 p-2 border rounded text-white shadow w-full'
                disabled={friendRequestSendLoading}
              />
              <button
                type="submit"
                className='p-2 bg-green-500 text-white rounded shadow flex justify-center items-center mt-2 sm:mt-0'
                disabled={friendRequestSendLoading}
              >
                {friendRequestSendLoading ? (
                  <svg className='animate-spin h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h4z"></path>
                  </svg>
                ) : 'Add'}
              </button>
            </form>
            <button
              onClick={() => setIsAdding(false)}
              className='absolute top-0 right-0 p-2 flex items-center justify-center bg-black text-white rounded-full shadow'
              style={{ width: '32px', height: '32px', lineHeight: '1' }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriends;
