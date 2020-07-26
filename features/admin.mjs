import dotenv from 'dotenv';
dotenv.config();

export default isAdmin;

function isAdmin(id)
{
    const admin_arr = process.env.ADMIN;
    if (id.toString() in admin_arr) return true;
    return false;
}