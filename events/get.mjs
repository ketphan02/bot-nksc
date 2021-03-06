import dotenv from 'dotenv';
dotenv.config();

export default getEvent;

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

function getEvent(app)
{
    app.get('/', (req, res) =>
    {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token)
        {
            if (mode === 'subscribe' && token === VERIFY_TOKEN)
            {
                console.log('VERIFIED');
                res.status(200).send(challenge);
            }
            else res.sendStatus(403);
        }
    });
}