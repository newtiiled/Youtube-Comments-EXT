async function rawComments(videoID) {
    const part = 'snippet'
    const fields = 'items(snippet(topLevelComment(snippet)))'
    const order = 'relevance'
    const maxResults = 100
    const key = 'API_KEY'
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoID}&part=${part}&fields=${fields}&order=${order}&maxResults=${maxResults}&key=${key}`

    return fetch(url)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error.message)
                } else {
                    return data
                }
            })
}

export async function getComments(videoID) {
    const data = rawComments(videoID)

    console.log(data)

    return data.items.map(item => {
        const com = item.snippet.topLevelComment.snippet
        return {
            author: com.authorDisplayName,
            comment: com.textOriginal
        }
    })
}