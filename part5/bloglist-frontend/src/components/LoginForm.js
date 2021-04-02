import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { Button, Notification, TextBox } from '../components'

const LoginForm = ({ onLogin }) => {
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onBlur' })

  return (
    <>
      <form onSubmit={handleSubmit(onLogin)}>
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
    </>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm