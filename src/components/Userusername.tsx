import React from 'react'

interface UserUsernameProps{
  name: string
  surname: string
}

const UserUsername: React.FC<UserUsernameProps> = ({name,surname}) => {
  return (
    <div>
      <h1>User Username</h1>
      <p>{name} {surname}</p>
    </div>
  )
}

export default UserUsername
