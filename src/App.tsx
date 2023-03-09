import { Outlet, useNavigate } from 'react-router-dom'
import { actions } from '@/store/modules/user'
import { Dispatch, State } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from './components/Header'
function App() {
  const dispatch = useDispatch<Dispatch>()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(actions.getUserInfo())
  }, [])

  const userState = useSelector((state: State) => state.userState)

  useEffect(() => {
    if (!userState.username) {
      // redirect to login page
      navigate('/login')
    }
  }, [userState.isLogin])

  return (
    <div className="h-screen flex flex-col" style={{ overflow: 'hidden' }}>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
