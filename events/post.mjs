import callSendAPI from '../features/text.mjs';
import isAdmin from '../features/admin.mjs';

export default postEvent;

let isDoing = false;

function postEvent(app)
{
    app.post('/', (req, res) =>
    {
        const body = req.body;

        if (body.object === 'page')
        {

            if (body.entry && body.entry.length <= 0) return;

            /*----GET MESSAGE AND PRINT TO CONSOLE----*/
            body.entry.forEach((entry) =>
            {
                entry.messaging.forEach((event) =>
                {
                    const sender_id = event.sender.id;
                    if (isAdmin(sender_id))
                    {
                        if (event.message && event.message.text.toLowerCase() === "start") isDoing = true;
                    }
                    else // if (isDoing)
                    {
                        if (event.message)
                        {
                            const text = event.message.text;
                            if (text == "hi") callSendAPI(sender_id, "hello");
                            else if (text == "info") callSendAPI(sender_id, "coded by PhanKiet");
                            else if (text == "help") callSendAPI(sender_id, process.env.MANUAL);
                            else if (text == "service") callSendAPI(sender_id, "your sender id is " + sender_id.toString());
                            else callSendAPI(sender_id, 'type "help" for further instruction');
                        }
                    }
                });
            });

            res.status(200).send('RECIEVED');
        }
        else res.sendStatus(404);
    });
}