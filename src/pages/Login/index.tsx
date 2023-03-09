import React, { useEffect } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Dispatch, State } from '@/store'
import { useState } from 'react'
import { User } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '@/store/modules/user'
import { setCurrentUser } from '@/services'

function Login() {
  const initState: User = {
    username: '',
    password: ''
  }

  const userState = useSelector((state: State) => state.userState)
  const navigate = useNavigate()

  const dispatch = useDispatch<Dispatch>()

  const [initialValues] = useState(initState)
  const [isRegister, setIsRegister] = useState(false)

  const handleChangeMode = (e: any) => {
    if (e?.target) {
      setIsRegister(e.target.checked)
    }
  }

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues: initialValues
  })

  const onSubmit = async (user: User) => {
    if (isRegister) {
      // to register
      dispatch(actions.doRegister(user))
    } else {
      // to login
      dispatch(actions.doLogin(user))
    }
  }
  const onError = (error: any) => {
    console.log('ERROR:::', error)
  }

  const [alertShow, setAlertShow] = useState(false)

  // if is login, navigate to personal page
  useEffect(() => {
    if (userState.isLogin) {
      // set user
      setCurrentUser({
        username: userState.username,
        password: userState.password
      })
      navigate(`/${userState.username}`)
    }
    if (userState.msg !== '') {
      setAlertShow(true)
    }
  }, [userState])

  const clearAlertMsg = () => {
    dispatch(
      actions.resetUser({
        msg: ''
      })
    )
    setAlertShow(false)
  }

  return (
    <div className="h-full position-relative w-full flex justify-center items-center">
      <Alert
        className="position-absolute top-0 left-0 w-full"
        variant="danger"
        dismissible
        show={alertShow}
        onClose={clearAlertMsg}
      >
        {userState?.msg}
      </Alert>
      <div className="flex flex-col justify-center h-full	 items-center">
        <div className="text-3xl font-medium mb-8">Hello Twitter</div>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="block">Username</Form.Label>
            <Form.Control
              {...register('username', {
                required: 'Username is required!'
              })}
              placeholder="Enter username..."
            />
            <div>
              {errors.username && (
                <Form.Text className="text-red-500">
                  {errors.username.message}
                </Form.Text>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="block">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              {...register('password', { required: 'Password is required!' })}
            />
            <div>
              {errors.password && (
                <Form.Text className="text-red-500">
                  {errors.password.message}
                </Form.Text>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="isRegister">
            <Form.Check
              type="checkbox"
              id="default-checkbox"
              label="register an account"
              onClick={handleChangeMode}
            />
          </Form.Group>
          <Button className="w-full" variant="primary" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
