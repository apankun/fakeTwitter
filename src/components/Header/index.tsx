import { setCurrentUser } from '@/services'
import { Dispatch, State } from '@/store'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
const HOME_TEXT = '<- HOME'
function Header() {
  const userState = useSelector((state: State) => state.userState)
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch>()
  const logout = () => {
    setCurrentUser(null)
    dispatch(
      actions.resetUser({
        username: '',
        isLogin: false
      })
    )
    navigate('/login')
  }

  return (
    <Navbar bg="primary" variant="dark" className="flex-shrink-0">
      <Container>
        <Navbar.Brand href="/"> {HOME_TEXT}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="flex items-center">
            Hello, {userState.username}!
            <Button variant="light" className="ml-2" size="sm" onClick={logout}>
              logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
