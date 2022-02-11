import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { URL } from '../config'



export default function NavBar(props) {

    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${URL}/user/login`, { email, password })
            console.log(res)
            setMessage(res.data.message)
            setTimeout(() => {
                res.data.ok && props.login(res.data.token)

            }, 2000)

        } catch (err) {
            console.error(err)
        }
    }
    const handleLogout = (e) => {
        e.preventDefault() 
        props.logout()
        setMessage('')
    }

    return <header>
        <NavLink
            exact='true'
            to='/'
        >
            <img src='/logo.jpeg'
                alt='colorful logo with letters p and a'
                className='logo' />
        </NavLink>
        <div style={{ display: "flex", flexDirection: 'column' }}>
            <p className='catchphrase'>What's cookin' good lookin'?</p>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <NavLink
                    to='/'
                    className='menulinks'>
                    Home
                </NavLink>
                <NavLink
                    to='recipes'
                    className='menulinks'>
                    Recipes
                </NavLink>
            </div>
        </div>

        <div className='menu-wrapper'>
            <img alt="chef's hat icon"
                className='profileicon'
                src={props.isLoggedIn ? 'icons8-chef-hat-gradient.png' : 'icons8-chef-hat-4.png'}
                onMouseEnter={() => setIsOpen(!isOpen)} />

            <nav>
                {isOpen &&
                    (!props.isLoggedIn ?
                        <form
                            className='loginmenu'
                            onMouseLeave={() => setIsOpen(false)}
                            onSubmit={handleLogin}>

                            <label>Email</label>
                            <input type='email' onChange={(e) => setEmail(e.target.value)}/>
                            <label>Password</label>
                            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
                            <button
                                style={{ margin: '5px 0px' }}>Submit</button>
                                <p>{message}</p>
                            <NavLink to='/register' id='registerlink'>Register</NavLink>
                        </form> :
                        <form
                            onSubmit={handleLogout}
                            className='isloggedinmenu'
                            onMouseLeave={() => setIsOpen(false)}>
                            <NavLink to='/profile' style={{ textDecoration: 'none', color: '#4d74c7', padding: '5px 0px' }}>Profile</NavLink>
                            <NavLink to='/pantry' style={{ textDecoration: 'none', color: '#4d74c7', padding: '5px 0px' }}>Pantry</NavLink>
                            <NavLink to='/yourrecipes' style={{ textDecoration: 'none', color: '#4d74c7', padding: '5px 0px' }}>Your Recipes</NavLink>
                            <NavLink to='/editprofile' style={{ textDecoration: 'none', color: '#4d74c7', padding: '5px 0px' }}>Edit Profile</NavLink>
                            <button>Logout</button>
                        </form>)}

                {/* <div id='navigationlinks'>
                    <NavLink exact style={({isActive}) => (isActive? styles.active :styles.default)} to='/register'>Register</NavLink>
                    <NavLink exact style={({isActive}) => (isActive? styles.active : styles.default)} to='/profile'>Profile</NavLink>
                    <NavLink exact style={({isActive}) => (isActive ? styles.active : styles.default)} to='/recipes'>Recipes</NavLink>
                </div> */}
            </nav>
        </div>
    </header>
}

