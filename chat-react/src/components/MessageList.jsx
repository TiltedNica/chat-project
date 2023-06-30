import {forwardRef} from 'react'
import {useEffect} from 'react'

import Message from './Message'

const MessageList = forwardRef(function MessageList({messages}, ref) {
  console.log(messages)

  useEffect(() => {
    const listElement = ref.current
    listElement.scrollTop = listElement.scrollHeight
  }, [messages])

  return (
    <div
      className="flex flex-1 flex-col space-y-4 overflow-y-scroll "
      ref={ref}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
})

export default MessageList
