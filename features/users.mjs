import global from '../global.mjs';

export default usersCommands;

function usersCommands(event)
{
    const sender_id = event.sender.id;
    if (event.message)
    {
        const msg = event.message.text;
        if (msg.toLowerCase() == "start" || msg.toLowerCase() == "bắt đầu")
        {
            console.log("HIII");
            let tmp = { id: sender_id, ques: 0 };
            global.arr_usr.push(tmp);
            console.log(global.arr_usr);
        }
    }
}