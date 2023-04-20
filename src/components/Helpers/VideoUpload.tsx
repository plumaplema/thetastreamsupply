
interface Signer {
    "status": string,
    "body": {
        "uploads": [
            {
                "id": string
                "service_account_id": string
                "presigned_url": string
                "presigned_url_expiration": string
                "presigned_url_expired": boolean,
                "create_time": boolean,
                "update_time": boolean
            }
        ]
    }
}

interface transcodeResult {
    "status": "success",
    "body": {
        "videos": [{ "id": string }]
    }
}

export const upload = async (video: FileList) => {
    const video_ = video[0]

    //create a sign url
    const response = await fetch('https://api.thetavideoapi.com/upload', {
        method: 'POST',
        headers: {
            'x-tva-sa-id': 'srvacc_1zv3nrtuz8vxq8kh9a91z70ra',
            'x-tva-sa-secret': 'hm8f1vdzb68wnhm87api2sfprhr1727q',
        }
    });

    const data: Signer = await response.json()
    const { id, presigned_url } = data.body.uploads[0]

    //upload video
    await fetch(presigned_url, {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/octet-stream'
        },
        body: JSON.stringify(video)
    })

    //transcode
    const transcode = await fetch('https://api.thetavideoapi.com/video', {
        'method': 'POST',
        'headers': {
            'x-tva-sa-id': 'srvacc_1zv3nrtuz8vxq8kh9a91z70ra',
            'x-tva-sa-secret': 'hm8f1vdzb68wnhm87api2sfprhr1727q',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "playback_policy": "public", "resolutions": [2160, 1080, 720, 360], "video_type": 0, "metadata": { "filename": "" }, "source_upload_id": id, "file_name": video_.name
        })
    })

    const trans = await transcode.json()

    console.log(trans)

    return { status: true, vid_id: '' }
}