import api from './axios';
// import axios from 'axios'
export default async function fetchUser() {
    const res = await api.get("http://localhost:4000/api/v1/auth/profile", {
        withCredentials: true, // important: sends the cookie
    });
    console.log(res)
    return res.data.data.user;
}