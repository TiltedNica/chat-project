import Contact from './Contact'
import {useState} from 'react'

export default function ContactList({channels}) {
  const [selectedChannel, setSelectedChannel] = useState(null)

  return (
    <div className="flex-1 space-y-4 overflow-y-scroll p-4">
      {channels.map((channel) => (
        <Contact
          key={channel.id}
          channel={channel}
          isSelected={channel === selectedChannel}
          onClick={() => setSelectedChannel(channel)}
        />
      ))}
    </div>
  )
}
