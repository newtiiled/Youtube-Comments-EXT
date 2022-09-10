async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
  
    return tabs[0];
}

document.addEventListener('DOMContentLoaded', async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get('v');

    if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
        pass
    } else {
        const container = document.getElementsByClassName('container')[0];
        container.innerHTML = '<div class="title">Waiting for video...</div>';
    }
});