
import axios from "axios"
import { useEffect, useState } from "react"
import Recipe from '../components/Recipe.js'

export default function YourRecipes(props) {


    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])
    // const [getCooking, setGetCooking] = useState([])
    // const [letsShop, setLetsShop] = useState([])

    //put user to state 
    //in useEffect keep track of state with pantry
    //rendering recipes.js component passing pantry through props 
    const callToAPI = async () => {//receives keywords 
        try {
            const test = ingredients.filter(ing => ing.check === true).map((item, i) => item.name)
            console.log(test)
            const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${test}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
            const res = await axios.get(url, {
                headers: {'Origin': 'https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${test}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}'}
            })
            console.log(res)
            setRecipes(res.data.hits)


        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        callToAPI();
    }, [])

    // useEffect(() => {
    //     if (recipes.length > 0 && ingredients.length > 0) {
    //         let tempGetCooking = [], tempLetsShop = []
    //         recipes.forEach((recipe, i) => {
    //             if (props.user.pantry.length === recipe.recipe.ingredients.length) {
    //                 tempGetCooking.push(recipe[i])
    //             } else {
    //                 tempLetsShop.push(recipe[i])
    //             }
    //         })
    //         setGetCooking(tempGetCooking)
    //         setLetsShop(tempLetsShop)
    //     }


    // }, [recipes, ingredients])

    useEffect(() => {
        const ingredientsMap = props.user?.pantry.map((ing, i) => ({ check: false, name: ing }))
        setIngredients(ingredientsMap);
    }, [props])

    const handleChange = (i) => {
        const copy = [...ingredients]
        copy[i].check = !copy[i].check
        setIngredients(copy)
    }

    return <div className='yourrecipesmaindiv'>

        <h1>Your Recipes</h1>
        <ul>
            {ingredients?.map((item, i) => {
                return <li key={i}>
                    {item.name}
                    <input type='checkbox' checked={item.check} onChange={() => handleChange(i)} />
                    
                </li>

            })}
        </ul>
        <button onClick={callToAPI}>Search</button>

        <div className="reciperesults">
            {recipes.map((recipe, i) => <Recipe user={props.user} updateUser={props.updateUser}
                recipe={recipe} isLoggedIn={props.isLoggedIn} key={recipe.recipe.url} />)}
        </div>

        <div>

        </div>
    </div>
}