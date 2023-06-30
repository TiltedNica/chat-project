import clsx from 'clsx'
import {useState} from 'react'
import {useUser} from '../context/auth.context'
import {formatDistance, parseISO, subDays} from 'date-fns'

export default function Message({message}) {
  console.log(useUser())

  const user = useUser()
  console.log(message)
  // console.log(messages.sender_name)

  const isAuthUser = message.sender_id === user.id
  let lastMessage = parseISO(message.created_at)
  console.log(lastMessage)

  return (
    <div
      className={clsx('flex items-end space-x-2', {
        'self-end': isAuthUser,
      })}
    >
      {!isAuthUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          {message.sender.name[0]}
        </div>
      )}
      <div>
        <div
          className={clsx('rounded-md p-4', {
            'rounded-bl-none bg-white': !isAuthUser,
            'text-cen  rounded-br-none bg-blue-100': isAuthUser,
          })}
        >
          {message.message}
        </div>
        <div className="">
          {formatDistance(new Date(message.created_at), new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  )
}
