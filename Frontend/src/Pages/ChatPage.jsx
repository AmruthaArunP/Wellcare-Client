import React from 'react'
import NavTopBar from '../components/home/NavTopBar'
import Chat from '../components/Chat/Chat'

function ChatPage({user}) {
  return (
    <>
    <NavTopBar/>
    {user === 'user' ? <Chat user={'user'}/> : <Chat user={'doctor'}/>}
    <Chat />
    </>


  )
}

export default ChatPage
