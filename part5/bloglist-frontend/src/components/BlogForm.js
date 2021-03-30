import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import TextBox from './TextBox'
import Button from './Button'
import Notification from './Notification'
import { createBlog } from '../services/blogs'

const BlogForm = ({ onCreateBlog }) => {
  const [error, setError] = useState(null)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()


  const onSubmit = async (data) => {
    try {
      const res = await createBlog(data)
      setError(false)
      reset()
      onCreateBlog(res.data)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend>Create Blog</legend>
      <TextBox
        label="Title"
        name="title"
        register={register({ required: 'Title is required' })}
        required
      />
      {!isEmpty(errors.title) &&
        <Notification type="error" message={errors.title.message}/>
      }
      <TextBox label="Author" name="author" register={register} />
      <TextBox
        label="URL"
        name="url"
        register={register({ required: 'URL is required' })}
        required
      />
      {!isEmpty(errors.url) &&
        <Notification type="error" message={errors.url.message}/>
      }
      <Button type="submit" label="create" />
      {error &&
        <Notification type="error" message="Unable to create blog entry at this time" />
      }
    </form>
  )
}

BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired
}

export default BlogForm