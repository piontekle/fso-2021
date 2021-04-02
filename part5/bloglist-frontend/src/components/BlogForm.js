import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import TextBox from './TextBox'
import Button from './Button'
import Notification from './Notification'

const BlogForm = ({ onCreateBlog }) => {
  const { register, formState: { errors }, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onCreateBlog)}>
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
    </form>
  )
}

BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired
}

export default BlogForm