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
    return new Promise(() =>
    {
        request.get(link, (err, res, body) =>
        {
            global.isInit = false;
            const first = '<div id="i1" class="freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont" role="heading" aria-level="3">';
            const second = '</div><div class="freebirdFormviewerComponentsQuestionBaseDescription"';
            try
            {
                console.log(body.match(new RegExp(first + "(.*)" + second))[1]);
                const text = body.match(new RegExp(first + "(.*)" + second));
                callSendAPI(sender_id, text[1]);
            }
            catch (_)
            {
                callSendAPI(sender, "Bạn không được làm admin của cái form lew lew");
            }
        });
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