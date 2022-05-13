import axios from 'axios';
import { useState } from 'react';
import { URL } from '../config'


export default function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${URL}/user/register`, { email, password, password2 })
            console.log(res)
            setMessage(res.data.message)
            setTimeout(() => {
                res.data.ok && props.login(res.data.token, res.data.user)
            }, 2000)
        } catch (err) {
            console.error(err)
        }
    }


    return <div className='registrationpage'>
        <div className='signup'>You're so close!
            <p>Just one more click </p>
            <p>to add some spice</p>
            <p>to your life.</p>
            
        </div>
        
        <div>
            <form className='registerform' onSubmit={(e) => handleSubmit(e)}>
                <h1>Create Account</h1>
                <label>Email</label>
                <input name='email' onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password</label>
                <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                <br />
                <label>Confirm Password</label>
                <input type='password' name='password2' onChange={(e) => setPassword2(e.target.value)} />
                <br />
                <button>Register</button>
            
                <p>{message}</p>
            </form>
        </div>
    </div>
}