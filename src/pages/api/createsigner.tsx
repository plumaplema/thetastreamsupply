import { NextApiRequest, NextApiResponse } from 'next';

type ThetaVideoApiResponse = {
    // Define your response type here
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
        const response = await fetch('https://api.thetavideoapi.com/upload', {
            method: 'POST',
            headers: {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET
            }
        });

        const data = await response.json() as ThetaVideoApiResponse;
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}