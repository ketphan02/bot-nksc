import global from '../global.mjs';
import callSendAPI from './text.mjs';

export default usersCommands;

async function start_survey(index, sender_id, msg)
{
    global.arr_usr[index].ans.push(msg);
    if (global.arr_ques.length === global.arr_usr[index].ans.length)
    {
        callSendAPI(sender_id, "Cảm ơn bạn vì đã dành thời gian tham gia khảo sát này.");
    }
    else
    {
        const k = global.arr_usr[index].ans.length;
        callSendAPI(sender_id, global.arr_ques[k]);
    }
}

function usersCommands(event)
{
    const sender_id = event.sender.id;
    if (event.message)
    {
        const msg = event.message.text;
        const index = global.arr_usr.find(x => x.id == semder_id);
        if (msg.toLowerCase() == "[start]" || msg.toLowerCase() == "[bắt đầu]")
        {
            if (index)
            {
                callSendAPI(sender_id, "Bạn đã sử dụng lệnh này. Dùng lệnh [restart] hoặc [bắt đầu lại] để làm lại");
                continue;
            }
            let tmp = { id: sender_id, ans: [] };
            global.arr_usr.push(tmp);
            await Promise.all([
                callSendAPI(sender_id, "Đang bắt đầu..."),
                start_survey(index, sender_id, msg)
            ]);
        }
        else if (msg.toLowerCase() == "[restart]" || msg.toLowerCase() == "[bắt đầu lại]")
        {
            global.arr_usr[index].ans = [];
            await callSendAPI(sender_id, "Đang xóa sạch câu trả lời cũ");
        }
        else if (index)
        {
            await start_survey(index, sender_id, msg);
        }
    }
}
