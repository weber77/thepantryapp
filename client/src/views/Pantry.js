import axios from 'axios'
import { useState } from 'react'
import {URL} from '../config'

export default function Pantry(props) {

    const [newItem, setNewItem] = useState('')
    const [ingredients] = useState(props.pantry)

    //need: add/delete functionalities using checkboxes
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${URL}/user/pantry/add`, {newItem})
            console.log(res)
            setNewItem('')
        } catch (err) {
            console.error(err)
        }
    }


    return <div className='mainpantrydiv'>
        <h1>Pantry</h1>
        {props.pantry.length === 0 && <h2>Oops! Looks like your pantry is empty! Let's add some things to get started</h2>}
        <form onSubmit={handleSubmit}>
            <input placeholder="type food here" onChange={(e) => setNewItem(e.target.value)}/>
            <button>Add me!</button>
        </form>
        
        <div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
}