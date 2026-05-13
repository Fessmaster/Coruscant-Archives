import { useSession } from "next-auth/react";

export default function AuthStatus(){

  const { data: session, status } = useSession()

  if (status === 'loading'){
    return (
      <div>Loading...</div>
    )
  }

  if (status ==='authenticated'){
    return (
      <div>
        <p>You login like {session.user.name}</p>
        <p>Token: {session.user.accessToken}</p>
      </div>
    )
  }

  return (
    <div>
      <p>Not authorizing</p>
    </div>
  )
}