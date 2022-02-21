import axios from "axios"
import { useEffect, useState } from "react"
import URL from '../config'
import Recipe from '../components/Recipe'


export default function Profile(props) {
    console.log(props.user.favouriteRecipes)

    return <div className="mainprofilediv">
        <h1>Welcome back, Chef!</h1>

        <div className="lrprofilediv">
            <div className="profileleft">
                <img src={props.user.favouriteRecipes[props.user.favouriteRecipes.length - 1].recipe.images.LARGE?.url || props.user.favouriteRecipes[props.user.favouriteRecipes.length - 1].recipe.images?.REGULAR.url} alt='image from last saved favourite recipe' />
                <img src={props.user.favouriteRecipes[props.user.favouriteRecipes.length - 2].recipe.images.LARGE?.url || props.user.favouriteRecipes[props.user.favouriteRecipes.length - 2].recipe.images?.REGULAR.url} alt='image from last saved favourite recipe' />
            </div>
            
            <div className="profileright">
                <h2>Favourite Recipes</h2>
                <ul className="profilefavrecipeul"> {props.user.favouriteRecipes.map(item => {
                    return <li>
                        <a href={item.recipe.url}>{item.recipe.label}</a>
                    </li>
                    })}
                </ul>
            </div>
        </div>

    </div>
}