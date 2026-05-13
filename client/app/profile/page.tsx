import LoginForm from "@/components/login-form";
import { auth } from "../auth";

export default async function ProfilePage(){
  const session = await auth()

  if (!session){
    return (
      <div>
        You need to login

        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <p> Hello, {session.user.name}</p>
      <p>Your ID: {session.user.id}</p>
    </div>
  )
}