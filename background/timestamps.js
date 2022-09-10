function convertSecs(time) {
    const parts = time.split(':').reverse()

    const sec = parseInt(parts[0])
    if (sec > 59) {
        return null
    }

    const min = parseInt(parts[1])
    if (min > 59) {
        return null
    }

    const hrs = parseInt(parts[2]) || 0
    return  (60 * 60 * hrs) + (60 * min) + sec
}

export function pickComments(comments) {
    const timestamp = new RegExp('[0-9]{0,2}:[0-9]{1,2}')
    let timeComments = []

    comments.items.map((item) => {
        if (timestamp.test(item.comment)) {
            const time = convertSecs(item.comment.match(timestamp)[0])

            if (time) {
                timeComments.push({
                    author: item.author,
                    timestamp: time,
                    comment: item.comment,
                })
            }
        }
    })

    console.log(timeComments)
    return timeComments
}