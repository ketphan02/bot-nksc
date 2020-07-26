import dotenv from 'dotenv';
dotenv.config();

export default isAdmin;

function isAdmin(id)
{
    const admin_arr = process.env.ADMIN;
    if (admin_arr.includes(id)) return true;
    return false;
}