import {Outlet, redirect, useLoaderData} from 'react-router-dom'

import ContactList from '../components/ContactList'
import {AuthContext} from '../context/auth.context'
import ky from '../utils/ky'

export async function loader() {
  try {
    const user = await ky.get('user').json()
    const channels = await ky.get('channels').json()

    console.log(channels)
    return {
      user,
      channels,
    }
  } catch (err) {
    if (err.response.status === 401) {
      return redirect('/login')
    }
  }
}

export default function App() {
  const {user, channels} = useLoaderData()

  function handleLogout() {
    localStorage.removeItem('token')

    window.location.reload()
  }

  function handleTitle() {
    const path = window.location.pathname

    if (path === '/') {
      return ''
    } else {
      const name = path.slice(-1)
      return channels[name - 1].name
    }
  }

  return (
    <AuthContext.Provider value={user}>
      <div className="flex h-screen">
        <div className="flex w-[320px] flex-col border border-gray-100">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            Channels
          </h2>
          <ContactList channels={channels} />
          <button
            className="mb-4 flex w-[300px] items-center justify-center gap-2 rounded-lg bg-[#0146fe] p-4 text-white"
            onClick={handleLogout}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              fill="#FFFFFF"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            Logout
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            {handleTitle()}
          </h2>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  )
}
