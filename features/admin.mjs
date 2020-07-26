import dotenv from 'dotenv';
import callSendAPI from './text.mjs';
dotenv.config();

export default isAdmin;

function isAdmin(id)
{
    const admin_arr = process.env.ADMIN;
    if (admin_arr.includes(id))
    {
        callSendAPI(id, "you are admin");
        return true;
    }
    return false;
}