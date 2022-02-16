// import {useState} from 'react'

export default function EditProfile(props) {
    //first receive user obj through props
    //to update user obj in app.js need to update setter 
    //form to enter new details
    //user passes new data 
    //onSubmit update the user state in app.js through props.setUser setter method
    //inside same funct use 
    //delete account - confirmation modal external library - send response to client logout client and delete token and send to homepage 
    //update pw - follow steps for authentication again. Ask fro current pw, newpw, send to back end, verify first pw through hashing and if match, update with new hashed pw following steps for signing up 

    return <div>
        <form className="editprofileform">
            <div className="epinlinedivs">
                <label>Username: </label>
                <input placeholder="type new username here" /><button>Update username</button>
            </div>
            <div className="epinlinedivs">
                <label>Email: </label>
                <input type='email' placeholder="type new email here" /><button>Update email</button>
            </div>
            <div className="epinlinedivs">
                <label>Password: </label>
                <input type='password' placeholder="type new password here" /> <button>Update Password</button>
            </div>

        </form>

    </div>
}