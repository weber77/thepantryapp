import axios from 'axios'
import { useState } from 'react'
import { URL } from '../config'


export default function EditProfile(props) {
    //first receive user obj through props
    //to update user obj in app.js need to update setter 
    //form to enter new details
    //user passes new data 
    //onSubmit update the user state in app.js through props.setUser setter method
    //inside same funct use 
    //delete account - confirmation modal external library - send response to client logout client and delete token and send to homepage 
    //update pw - follow steps for authentication again. Ask for current pw, newpw, send to back end, verify first pw through hashing and if match, update with new hashed pw following steps for signing up 

    const [message, setMessage] = useState('')
    const [form, setForm] = useState ({
        username: '',
        old_pw: '',
        new_pw: '',
        new_pw2: ''
    })

    // const deleteHandler = (i, e) => {
    //     e.preventDefault()
    // props.isLoggedIn(false)
    //     props.updateUser(props.onDelete)
    // }
    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value} )
    }

    const handleUsernameChange = () => {
        // form.username is not empty
        console.log(form.username);
        props.updateUser('username', form.username)
    }

    const handlePwChange = async () => {
        try {
            const res = await axios.post(`${URL}/user/updatepw`, {
                old_pw: form.old_pw,
                new_pw: form.new_pw,
                new_pw2: form.new_pw2,
                email: props.user.email
            })
            console.log(res)
        
        } 
        catch (err) {
            console.error(err)
        }
    }

    return <div>
        <section className="editprofileform">

            <br />
            <div className="epinlinedivs">
                <p>Current username: {props.user.username}</p>
                <label>New username: </label>
                <input name='username' placeholder="type new username here" onChange={handleChange} />
                <button onClick={handleUsernameChange}>
                    Update username
                </button>
            </div>

            <br />
            <div>
                <label>Password: </label>
                <input name='old_pw' type='password' placeholder='type old password' onChange={handleChange} />
                <input name='new_pw' type='password' placeholder="type new password" onChange={handleChange} />
                <input name='new_pw2' type='password' placeholder='confirm new password' onChange={handleChange} />
                <button onClick={handlePwChange}>
                    Update Password
                </button>
            </div>

            <button style={{ maxWidth: 'fit-content' }}
            // onClick={(e) => {window.confirm('Are you sure you wish to proceed? This action will permanently delete your account.') ? onCancel(e) : deleteHandler(e)}}
            >
                Delete account
            </button>

        </section>

    </div>
}