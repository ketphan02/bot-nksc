import callSendAPI from '../features/text.mjs';
import { isAdmin, adminCommands } from '../features/admin.mjs';
import global from '../global.mjs';

export default postEvent;

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
                entry.messaging.forEach(async (event) =>
                {
                    const sender_id = event.sender.id;
                    if (isAdmin(sender_id))
                    {
                        console.log(global.isInit);
                        adminCommands(event);
                    }
                    else if (global.isDoing)
                    {
                        if (event.message)
                        {
                            const text = event.message.text;
                            await callSendAPI(sender_id, text);
                        }
                    }
                });
            });

            res.status(200).send('RECIEVED');
        }
        else res.sendStatus(404);
    });
}