import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register({ onRegistration }) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormValues((x) => ({
            ...x,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onRegistration(formValues.password, formValues.email)
    }

    return (
        <div className='auth'>
            <h3 className='auth__title'>Регистрация</h3>
            <form onSubmit={handleSubmit} className='auth__form'>
                <input
                    onChange={handleChange}
                    value={formValues.email || ''}
                    className='auth__input'
                    name='email'
                    type='email'
                    placeholder='Email'
                    required
                />
                <input
                    onChange={handleChange}
                    value={formValues.password || ''}
                    className='auth__input'
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    required
                />
                <button type='submit' className='auth__button'>Зарегистрироваться</button>
            </form>
            <Link to="./sign-in" className='auth__link'>
                Уже зарегистрированы? Войти
            </Link>
        </div>
    )
}

export default Register