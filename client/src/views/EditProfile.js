import axios from 'axios'
import { useState } from 'react'
import Modal from 'react-modal'

import { URL } from '../config'

Modal.setAppElement('#root')
export default function EditProfile(props) {
    //first receive user obj through props
    //to update user obj in app.js need to update setter 
    //form to enter new details
    //user passes new data 
    //onSubmit update the user state in app.js through props.setUser setter method
    //inside same funct use 
    //delete account - confirmation modal external library - send response to client logout client and delete token and send to homepage 
    //update pw - follow steps for authentication again. Ask for current pw, newpw, send to back end, verify first pw through hashing and if match, update with new hashed pw following steps for signing up 
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [form, setForm] = useState ({
        username: '',
        old_pw: '',
        new_pw: '',
        new_pw2: ''
    })

    const deleteHandler = async () => {
        try {
            const res = await axios.post(`${URL}/user/delete`, {id: props.user._id})
            props.logout();
        } 
        catch (err) {
            console.error(err)
        }
    }
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

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

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
            onClick={() => setIsOpen(true)}
            >
                Delete account
            </button>

        </section>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Modal for delete account confirmation"
      >
          <h1>Are you sure you wish to proceed? This action will premanently delete your account.</h1>
          <button onClick={() => setIsOpen(false)}>Cancel </button>
          <button onClick={deleteHandler}>OK</button>
      </Modal>

    </div>
}