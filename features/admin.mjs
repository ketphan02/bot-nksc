import dotenv from 'dotenv';
dotenv.config();

import callSendAPI from './text.mjs';
import { isDoing, isInit } from '../app.mjs'

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
        if (link.includes("doc.google.com/forms/d/")) return true;
        return false;
    }
    catch (e)
    {
        console.log(e);
        return false;  
    }
}

function curlURL(link)
{
    return new Promise((resolve, reject) =>
    {
        fetch(link)
        .then(res => res.json())
        .then(data => console.log(data));
    });
}

async function adminCommands(event)
{
    const sender_id = event.sender.id;
    if (event.message)
    {
        if (!isInit)
        {
            const text = event.message.text;
            if (text.toLowerCase() == 'start')
            {
                await callSendAPI(sender_id, "Hãy đưa tôi Google Form");
                isInit = true;
            }
        }
        else
        {
            console.log("is init");
            const link = event.message.text;
            if (isGoogleForm(link))
            {
                await callSendAPI(sender_id, "Curling...");
                await curlURL(link);
            }
            else await callSendAPI(sender_id, "Đây không phải là Google Form, hãy nhập lại.");
        }
    }
    else console.log("not a message type");
}