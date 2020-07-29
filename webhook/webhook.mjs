import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import getEvent from '../events/get.mjs';
import postEvent from '../events/post.mjs'

export default  webhook;

const app = express();
const port = process.env.PORT;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

function webhook()
{
    app.use(bodyParser.json());
    app.use(express.urlencoded( { extended: false } ));

    app.listen(port, () =>
    {
        console.log("SERVER IS STARTED");
    })

    postEvent(app);

    getEvent(app);
}