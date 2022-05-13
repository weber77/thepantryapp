import { useState, useEffect } from 'react'

export default function Pantry(props) {
console.log('props',props)
    const [newItem, setNewItem] = useState('')


    // const callToAPI = () => {

    // }

    useEffect(() => console.log(props), [props])


    //need: add/delete functionalities using checkboxes
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            console.log(props.pantry)
            const copy = [...props.pantry]
            copy.push(newItem)
            props.updateUser('pantry', copy);
            setNewItem('')
        } catch (err) {
            console.error(err)
        }
    }

    const handleClick = (i) => {
        try {
            const copy = [...props.pantry]
            copy.splice(i, 1)
            props.updateUser('pantry', copy)
        }
        catch (err) {
            console.error(err)
        }
    }

    return <div className='mainpantrydiv'>
        <h1>Pantry</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder="type food here" onChange={(e) => setNewItem(e.target.value)} value={newItem} />
            <button className='addBtn'>Add me!</button>
        </form>
        {props.pantry?.length === 0
            ? <h2>Oops, looks like your pantry is empty! Let's add some things to get started</h2>
            : <ul>
                {props.pantry?.map((item, i) => {
                    return <li key={item}>
                        {item}
                        <button onClick={() => handleClick(i)}>
                            <img src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-bin-mobile-user-interface-tulpahn-detailed-outline-tulpahn.png" alt='icon - black outline of a trash bin'/>
                        </button>
                        
                    </li>
                })}
            </ul>}
    </div>
}