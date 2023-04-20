import { NextApiRequest, NextApiResponse } from 'next';

type ThetaVideoApiResponse = {
    // Define your response type here
}

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


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ThetaVideoApiResponse>
) {
    const { TVA_SA_ID, TVA_SA_SECRET } = process.env;

    if (!TVA_SA_ID || !TVA_SA_SECRET) {
        res.status(500).json({ message: 'API credentials missing' });
        return;
    }

    try {
        const body = await req.body
        const result: { id: string, file_name: string } = JSON.parse(body)
        const transcode = await fetch('https://api.thetavideoapi.com/video', {
            'method': 'POST',
            'headers': {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "playback_policy": "public", "resolutions": [2160, 1080, 720, 360], "video_type": 1, "metadata": { "filename": result.file_name }, "source_upload_id": result.id, "file_name": `${result.file_name}` })
        })
        const trans = await transcode.json()
        console.log({ "playback_policy": "public", "resolutions": [2160, 1080, 720, 360], "video_type": 1, "metadata": { "filename": result.file_name }, "source_upload_id": result.id, "file_name": `${result.file_name}` })
        res.status(200).json(trans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
