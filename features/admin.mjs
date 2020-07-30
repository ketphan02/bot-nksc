import dotenv from 'dotenv';
dotenv.config();

import callSendAPI from './text.mjs';
import global from '../global.mjs';
import request from 'request';
import DOMParser from 'dom-parser';

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

        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(body, 'text/html');
        let script = htmlDoc.getElementsByClassName("freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont");
        
        global.questNum = script.length;
        global.isDoing = true;
        
        for (let i = 0; i < global.questNum; ++ i)
        {
            callSendAPI(sender_id, script[i].textContent);
            global.arr_ques.push(script[i]);
        }

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
                await Promise.all([callSendAPI(sender_id, "Curling..."), curlURL(link, sender_id)]);
            }
            else await callSendAPI(sender_id, "Đây không phải là Google Form, hãy nhập lại.");
        }
    }
    else console.log("not a message type");
}