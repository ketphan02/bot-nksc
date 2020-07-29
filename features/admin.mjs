import dotenv from 'dotenv';
dotenv.config();

import callSendAPI from './text.mjs';
import global from '../global.mjs'
import fetch from 'node-fetch';
import request from 'request';

export
{
    isAdmin,
    adminCommands
}

function isAdmin(id)
{
    const admin_arr = process.env.ADMIN;
    if (admin_arr.includes(id)) return true;
    return false;
}

function isGoogleForm(link)
{
    try
    {
        new URL(link);
        if (link.includes("docs.google.com/forms/d/")) return true;
        return false;
    }
    catch (_)
    {
        return false;  
    }
}

async function curlURL(link, sender_id)
{
    request.get(link, (err, res, body) =>
    {
        global.isInit = false;
        const first = 'var FB_PUBLIC_LOAD_DATA_ = ';
        const second = ';</script><script id="base-js" ';
        // try
        // {
        //     let text = body.match(new RegExp(first + "(.*)" + second))[1];
        //     text = 'var arr = ' + text;
        //     console.log(text);
        //     eval(text);
        // }
        // catch (_)
        // {
        //     console.log(first + "(.*)" + second);
        //     console.log("FAILED");
        //     console.log(body);
        // }
    
        doc = body.parse();
        console.log(doc);
        link = doc.select("script").first();
        console.log(link);

    });
}

async function adminCommands(event)
{
    const sender_id = event.sender.id;
    if (event.message)
    {
        if (!global.isInit)
        {
            const text = event.message.text;
            if (text.toLowerCase() == 'start')
            {
                global.isInit = true;
                await callSendAPI(sender_id, "Hãy đưa tôi Google Form");
            }
        }
        else
        {
            const link = event.message.text;
            if (isGoogleForm(link))
            {
                Promise.all([callSendAPI(sender_id, "Curling..."), curlURL(link, sender_id)]);
            }
            else await callSendAPI(sender_id, "Đây không phải là Google Form, hãy nhập lại.");
        }
    }
    else console.log("not a message type");
}