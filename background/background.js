import { getComments } from './googleapi.js'
import { pickComments } from './timestamps.js'

async function getTimeComments(videoID) {
    const data = getComments(videoID)
    return pickComments(data)
}

console.log('hi')
let videoURLNO

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        videoURLNO = urlParameters.get("v")
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { type, videoId } = request;
    console.log('hi2')
    console.log(type)
    console.log(videoId)
    console.log(videoURLNO)

    if (type == 'GET_COMMENTS') {
        getTimeComments(videoId)
            .then(sendResponse)
            .catch(e => {
                console.error(e)
            })
        return true
    }
})