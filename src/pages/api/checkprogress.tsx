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
        const result: { upload_id } = JSON.parse(body)
        const progress = await fetch(`https://api.thetavideoapi.com/video/${result.upload_id}`, {
            'method': 'GET',
            'headers': {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET,
            },
        })
        const prog = await progress.json()
        res.status(200).json({ prog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
