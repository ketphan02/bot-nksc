import dotenv from 'dotenv';
dotenv.config();

import request from 'request';

export default callSendAPI;

function callSendAPI(sender_psid, response)
{    
    const request_body =
    {
        "recipient":
        {
            "id": sender_psid
        },
        "message":
        {
            "text": response
        }
    };

    // Send the HTTP request to the Messenger Platform
    request(
    {
        "url": `https://graph.facebook.com/v7.0/me/messages`,
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) =>
    {
        if (err) console.error("Unable to send message:", err);
    });
}