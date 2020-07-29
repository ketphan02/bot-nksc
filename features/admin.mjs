import dotenv from 'dotenv';
dotenv.config();

import callSendAPI from './text.mjs';
import global from '../global.mjs'
import fetch from 'node-fetch';

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

function curlURL(link)
{
    return new Promise(() =>
    {
        const opt = 
        {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };


        fetch(link, opt)
        .then((result) =>
        {
            console.log(result);
        })
        .catch((err) => console.log(err));
    });
}

function Actions()
{
    return new Promise(() =>
    {
        console.log("HELLO");
        global.isInit = false;
    })
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
                await Promise.all([
                    callSendAPI(sender_id, "Curling..."),
                    curlURL(link),
                    Actions()
                ]);
            }
            else await callSendAPI(sender_id, "Đây không phải là Google Form, hãy nhập lại.");
        }
    }
    else console.log("not a message type");
}