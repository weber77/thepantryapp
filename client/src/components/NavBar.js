import { NavLink } from 'react-router-dom'
import { useState } from 'react'


export default function NavBar(props) {

    const [isOpen, setIsOpen] = useState(false)



    const styles = {
        active: {
            color: 'pink'
        },
        default: {
            color: 'white'
        }
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
            <img
                className='profileicon'
                src={props.isLoggedIn ? 'icons8-chef-hat-gradient.png' :'icons8-chef-hat-4.png'}
                onMouseEnter={() => setIsOpen(!isOpen)} />

            <nav>
                {isOpen &&
                    <form
                        className='loginmenu'
                        onMouseLeave={() => setIsOpen(false)}>

                        <label>Email</label>
                        <input type='email' />
                        <label>Password</label>
                        <input type='password' />
                        <button
                            style={{ margin: '5px 0px' }}>Submit</button>
                        <NavLink to='/register' id='registerlink'>Register</NavLink>
                    </form>}
                {/* <div id='navigationlinks'>
                    <NavLink exact style={({isActive}) => (isActive? styles.active :styles.default)} to='/register'>Register</NavLink>
                    <NavLink exact style={({isActive}) => (isActive? styles.active : styles.default)} to='/profile'>Profile</NavLink>
                    <NavLink exact style={({isActive}) => (isActive ? styles.active : styles.default)} to='/recipes'>Recipes</NavLink>
                </div> */}
            </nav>
        </div>
    </header>
}

