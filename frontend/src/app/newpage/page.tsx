'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'


export default function Page() {
  const { AuthUser } = useAuth()
  const route = useRouter()
  console.log(AuthUser)
  setTimeout(() => {
      route.push("/profile")
  }, 2000);
  return <div>{AuthUser ? AuthUser.email : "meow"}</div>
}
