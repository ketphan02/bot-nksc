import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import getEvent from '../events/get.mjs';
import postEvent from '../events/post.mjs'

export default webhook;

const app = express();

function webhook()
{
    app.use(bodyParser.json());
    app.use(urlencoded( { extended: false } ));

    app.listen(port, () =>
    {
        console.log("SERVER IS STARTED");
    })

    postEvent(app);

    getEvent(app);
}