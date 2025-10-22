import api from './api';
// import axios from 'axios'

const url = process.env.NEXT_PUBLIC_BACKEND_URL
export default async function fetchUser() {
    const res = await api.get(`${url}/api/v1/auth/profile`, {
        withCredentials: true, // important: sends the cookie
    });
    console.log(res)
    return res.data.data.user;
}