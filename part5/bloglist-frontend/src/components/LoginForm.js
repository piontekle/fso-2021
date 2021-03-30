import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { Button, Notification, TextBox } from '../components'
import { login } from '../services/login'

const LoginForm = ({ onLogin }) => {
  const [error, setError] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onBlur' })

  const loginUser = async user => {
    try {
      const res = await login(user)
      setError(false)
      onLogin(res.data)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(loginUser)}>
        <legend>Login</legend>
        <TextBox
          label="Username"
          name="username"
          register={register({ required: 'Username is required' })}
          required
        />
        <TextBox
          label="Password"
          name="password"
          type="password"
          register={register({ required: 'Password is required' })}
          required
        />
        <Button type="submit" label="Login" />
      </form>
      {!isEmpty(errors.username) &&
          <Notification type="smError" message={errors.username.message}/>
      }
      {!isEmpty(errors.password) &&
          <Notification type="smError" message={errors.password.message}/>
      }
      {error &&
        <Notification type="error" message="Incorrect username or password" />
      }
    </>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm