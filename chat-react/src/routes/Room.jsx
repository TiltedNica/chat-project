import {useEffect, useRef, useState} from 'react'
import {useLoaderData, useRevalidator} from 'react-router-dom'

import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import echo from '../utils/echo'
import ky from '../utils/ky'

export async function action({params, request}) {
  const formData = await request.formData()

  await ky
    .post('messages', {
      json: {
        message: formData.get('message'),
        channel_id: params.roomId,
      },
    })
    .json()

  return {}
}

export async function loader({params}) {
  const messages = await ky.get(`messages/${params.roomId}`).json()
  console.log(messages)
  return {
    messages,
  }
}

export default function Room() {
  const formRef = useRef(null)
  const listRef = useRef(null)
  const {messages} = useLoaderData()
  const revalidator = useRevalidator()
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    const listener = echo.channel('messages').listen('MessageCreated', () => {
      revalidator.revalidate()
      setUnreadMessages((prevCount) => prevCount + 1)
    })

    formRef.current.reset()
    listRef.current.scrollTo(0, listRef.current.scrollHeight)

    return () => listener.stopListening('MessageCreated')
  }, [revalidator])

  useEffect(() => {
    const handleScroll = () => {
      const listElement = listRef.current
      const {scrollTop, offsetHeight, scrollHeight} = listElement
      const isScrolledToBottom = scrollTop + offsetHeight >= scrollHeight

      if (isScrolledToBottom) {
        setUnreadMessages(0)
      }
    }

    listRef.current.addEventListener('scroll', handleScroll)

    return () => {
      listRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-100 p-4">
      <MessageList messages={messages} ref={listRef} />
      <div className="text-center">{unreadMessages} mensajes no leídos</div>
      <MessageForm ref={formRef} />
    </div>
  )
}
