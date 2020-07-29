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

function Actions(body)
{
    console.log(body);
    return new Promise(() =>
    {
        global.isInit = false;
        const first = '<div id=\"i1\" class=\"freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont\"';
        const second = '</div><div class=\"freebirdFormviewerComponentsQuestionBaseDescription\"';

        console.log(test.match(new RegExp(first + "(.*)" + second)));
    });
}

async function curlURL(link)
{
    return new Promise(async () =>
    {
        const res = request.get(link, (err, res, body) =>
        {
            console.log(typeof body);
            return body;
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
                const body = await curlURL(link);
                await Promise.all([
                    callSendAPI(sender_id, "Curling..."),
                    Actions(body)
                ])
            }
            else await callSendAPI(sender_id, "Đây không phải là Google Form, hãy nhập lại.");
        }
    }
    else console.log("not a message type");
}