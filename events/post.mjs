export default postEvent;

function postEvent(app)
{
    app.post('/', (req, res) =>
    {
        console.log("POST");
    });
}