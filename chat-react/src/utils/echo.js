import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

export default new Echo({
  broadcaster: 'pusher',
  key: '7bc05a46998073c691d2',
  cluster: 'us2',
  forceTLS: true,
})
