import global from '../global.mjs';
import callSendAPI from './text.mjs';

export default usersCommands;

async function start_survey(index, msg)
{
    if (msg === "[start]" || msg === "[bắt đầu]") ;
    else global.arr_usr[index].ans.push(msg);
    console.log(global.arr_usr[index]);
    if (global.arr_ques.length === global.arr_usr[index].ans.length)
    {
        await callSendAPI(global.arr_usr[index].id, "Cảm ơn bạn vì đã dành thời gian tham gia khảo sát này.");
    }
    else
    {
        console.log("HELLO");
        const k = global.arr_usr[index].ans.length;
        console.log(k);
        console.log(global.arr_usr[index].id, global.arr_ques[k].textContent);
        await callSendAPI(global.arr_usr[index].id, global.arr_ques[k].textContent);
    }
}

async function usersCommands(event)
{
    const sender_id = event.sender.id;
    if (event.message)
    {
        const msg = event.message.text;
        let index = global.arr_usr.findIndex(x => x.id == sender_id);
        console.log(index);
        if (msg.toLowerCase() == "[start]" || msg.toLowerCase() == "[bắt đầu]")
        {
            if (index >= 0)
            {
                console.log(index);
                await callSendAPI(sender_id, "Bạn đã sử dụng lệnh này. Dùng lệnh [restart] hoặc [bắt đầu lại] để làm lại");
            }
            else
            {
                let tmp = { id: sender_id, ans: [] };
                global.arr_usr.push(tmp);
                index = global.arr_usr.findIndex(x => x.id == sender_id);
                await Promise.all([
                    callSendAPI(sender_id, "Đang bắt đầu..."),
                    start_survey(index, msg)
                ]);
            }
        }
        else if (msg.toLowerCase() == "[restart]" || msg.toLowerCase() == "[bắt đầu lại]")
        {
            global.arr_usr[index].ans = [];
            await Promise.all([
                callSendAPI(sender_id, "Đang xóa sạch câu trả lời cũ"),
                start_survey(index, msg.toLowerCase())
            ]);
        }
        else if (index >= 0)
        {
            await start_survey(index, msg);
        }
    }
}
