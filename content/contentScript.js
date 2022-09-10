let timeComments = []

function getVideoId() {
    if (window.location.pathname == '/watch') {
        const queryParams = window.location.href
        const urlParams = new URLSearchParams(queryParams)

        return urlParams.get('v')
    } else {
        return null
    }
}

chrome.runtime.sendMessage({
    type: "GET_COMMENTS",
    videoID: getVideoId()
}, function(response) {
    console.log(response)
    timeComments = response
});