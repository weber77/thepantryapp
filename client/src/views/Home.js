import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('')


    return <div class='splashscreen-wrapper'>
        <div>

            <form >
                <input placeholder="let's find something tasty" onChange={(e) => setSearchTerm(e.target.value)} />
                <Link to={{
                    pathname: '/recipes',
                    search: searchTerm
                }}>
                    <button type='submit' style={{ margin: '0px 5px' }}>Search</button>
                </Link>
            </form>

        </div>

    </div>
}