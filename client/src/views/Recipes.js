import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Recipe from '../components/Recipe.js'

export default function Recipes(props) {
//check if we have props or not; if props no location used and instead line 23 below
//have to put pantry list from props 
//if data comes from props inside URL there should be pantry list 
//check API docs to see how to pass several keywords in search -- integrated feature 
    let location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([])

    let locationSearch = location.search.replace('?', '')


    const callToAPI = async (e, locSearch) => {//receives keywords 
        e && e.preventDefault();
        const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${locSearch
            ? locationSearch
            : searchTerm}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
        const res = await axios.get(url, {
            headers: {'Origin': 'https://thepantryapp.herokuapp.com/'}
        })
        setRecipes(res.data.hits)
        try {

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {//decide which keywords to send to callToAPI
        //3rd option if there's something in props tell API what you're searching for
        if (locationSearch) {
            callToAPI(null, true)
        }
    }, [])





    return (
        <div className='mainrecipessearchdiv'>
            <form onSubmit={callToAPI} className='recipesform'>
                <h1>Recipes</h1>
                <input
                    type='search'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Let's find a recipe" />
            </form>
            <br />
            <br />
            <div className='reciperesults'>
                {recipes.map((recipe, i) => <Recipe recipe={recipe} />)}
            </div>




        </div>)
}