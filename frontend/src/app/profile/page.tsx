"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../functions/axios";
import { useAuth } from "@/context/AuthContext";
import { IUser } from "@/context/AuthContext";

const defaultAvatar =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";


export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const {AuthUser,setAuthUser} = useAuth()


  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("http://localhost:4000/api/v1/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.data.user);
        const contextUser = {email: res.data.data.user.email, username: res.data.data.user.username}
        console.log("this is contextuser ", contextUser)
        console.log(res)
        setAuthUser(contextUser)
        router.push('/newpage')
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
      setTimeout(() => {
        router.push("/todo")
      }, 5000);
    };

    if(!AuthUser){
      fetchProfile()
    }
    else {
      setUser(AuthUser)
    }
  }, []);

  if (!user)
    return (
      <div className="pt-18 flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading profile...
      </div>
    );

  return (
    <div>
      <div>
        this is the profile Page
        {user.email}
        {user.username}
      </div>
    </div>
  );
}
