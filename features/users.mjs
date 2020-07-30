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
            let tmp = { sender_id: 0 };
            Object.assign(global.arr_usr, tmp);
        }
    }
}