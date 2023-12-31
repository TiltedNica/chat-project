import {forwardRef, useState} from 'react'
import {Form, useParams} from 'react-router-dom'

const MessageForm = forwardRef(function MessageForm(props, ref) {
  const params = useParams()

  return (
    <Form
      action={`/rooms/${params.roomId}`}
      className="mt-4 rounded-md bg-white p-2"
      method="post"
      ref={ref}
    >
      <input
        autoFocus
        className="block w-full bg-white px-4 py-2"
        name="message"
        placeholder="Message..."
        type="text"
      />
    </Form>
  )
})

export default MessageForm
