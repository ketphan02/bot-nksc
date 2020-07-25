import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import getEvent from '../events/get.mjs';
import postEvent from '../events/post.mjs'

export default webhook;

const app = express();
const port = process.env.PORT;

function webhook()
{
    app.use(bodyParser.json());
    app.use(express.urlencoded( { extended: false } ));

    app.listen(port, () =>
    {
        console.log("SERVER IS STARTED");
    })

    postEvent(app);

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