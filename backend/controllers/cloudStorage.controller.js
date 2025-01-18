import { dbx } from "../controllers/cloudTokenRegeneration.controller.js";

// Function to upload the file in dropbox 
const uploadFile = async (file) => {
    try {
        const response = await dbx.filesUpload({
            path: `/${file.originalname}`,
            contents: file.buffer,
        });
        return response.result.path_display
    }
    catch (error) {
        console.error('Error uploading file to Dropbox: ', error.message);
    }
};

//Funtion to get the downloaded link of the uploaded file 
const gettingDropBoxUploadeShareableLink = async (path) => {
    try {
        const existingLinksResponse = await dbx.sharingListSharedLinks({
            path: path
        });
        if (existingLinksResponse.result.links.length > 0) {
            const existingLink = existingLinksResponse.result.links[0].url.replace('?dl=0', '?dl=1');
            return existingLink;
        } else {
            const newLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({ path: path, });
            const newLink = newLinkResponse.result.url.replace('?dl=0', '?dl=1');
            return newLink;
        }
    } catch (error) {
        console.error('Error getting uploaded Dropbox download link: ', error.message);
    }
}

export const savetoCloud = async (req, res) => {
    try {
        const file = await req.file
        const response = await uploadFile(file)
        const uploadfileShareableLink = await gettingDropBoxUploadeShareableLink(response)
        return res.json({ success: true, message: "Attachment attached successfully", attachment_link: uploadfileShareableLink })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}