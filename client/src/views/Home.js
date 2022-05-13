import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('')


    return <div className='splashscreen-wrapper'>
        <div className='homepageform'>
            <p className='homepagetext'>Let's get started!</p>
                <input placeholder="Type an ingredient here" 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{width:'160px', margin: '5px', padding: '15px 10px', borderRadius: '10px'}}
                 />
                <Link to={{
                    pathname: '/recipes',
                    search: searchTerm
                }}>
                    <button className='searchBtn' type='submit'>Search</button>
                </Link>
        </div>

    </div>
}