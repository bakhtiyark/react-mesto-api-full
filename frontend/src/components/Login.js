import { useState } from 'react'

function Login({ onLogin }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(formValues.password, formValues.email)
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>Вход</h3>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input onChange={handleChange} className='auth__input' type='email' placeholder='Email' name='email' value={formValues.email || ''} required />
        <input onChange={handleChange} className='auth__input' type='password' placeholder='Пароль' name='password' value={formValues.password || ''} required />
        <button type='submit' className='auth__button'>Войти</button>
      </form>
    </div>
  )
}

export default Login