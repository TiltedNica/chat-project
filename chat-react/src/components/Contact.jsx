import {Link} from 'react-router-dom'

export default function Contact({channel, isSelected, onClick}) {
  return (
    <div
      className={`contact ${isSelected ? 'selected' : ''} rounded-lg p-5`}
      onClick={onClick}
    >
      <Link to={`/rooms/${channel.id}`}>{channel.name}</Link>
    </div>
  )
}
