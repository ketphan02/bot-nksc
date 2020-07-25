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
                entry.messaging.forEach((event) =>
                {
                    const sender_id = event.sender.id;

                    if (event.message)
                    {
                        console.log(sender_id, event);
                    }
                });
            });

            res.status(200).send('RECIEVED');
        }
        else res.sendStatus(404);
    });
}