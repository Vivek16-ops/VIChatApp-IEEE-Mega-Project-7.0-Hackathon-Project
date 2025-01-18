import axios from 'axios';
import { Dropbox } from 'dropbox';

let accessToken = '';
let expiresIn = 0;
let expiresAt = 0;
let dbx = null;

async function refreshAccessToken() {
    try {
        const response = await axios.post('https://api.dropbox.com/oauth2/token', null, {
            params: {
                refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
                grant_type: 'refresh_token',
                client_id: process.env.DROPBOX_APP_KEY,
                client_secret: process.env.DROPBOX_APP_SECRET,
            },
        });
        accessToken = response.data.access_token;
        expiresIn = response.data.expires_in;
        expiresAt = Date.now() + expiresIn * 1000;

        // Update dbx instance with new access token 
        dbx = new Dropbox({ accessToken: accessToken });
    } catch (error) {
        console.error('Error refreshing access token:', error.message);
    }
}

setInterval(async () => {
    // Refresh token one minute before it expires 
    if (Date.now() >= expiresAt - 60000) { await refreshAccessToken(); }
}, 60000);

export const DropboxcloudTokenRegenerate = async (req, res) => {
    try {
        if (Date.now() >= expiresAt) { await refreshAccessToken(); }
        return res.json({ success: true, message: "Access Token regenerated successfully", accessToken: accessToken })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Export dbx instance
export { dbx };