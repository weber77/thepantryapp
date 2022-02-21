import axios from "axios"
import { useEffect, useState } from "react"
import URL from '../config'
import Recipe from '../components/Recipe'


export default function Profile(props) {
    console.log('props: ', props.user.favouriteRecipes[props.user.favouriteRecipes.length - 1].recipe.images.REGULAR.url)

    return <div className="mainprofilediv">
        <h1>Welcome back, Chef!</h1>

        <div className="lrprofilediv">
            <div className="profileleft">
                <img src={props.user.favouriteRecipes[props.user.favouriteRecipes.length - 1].recipe.images.LARGE?.url || props.user.favouriteRecipes[props.user.favouriteRecipes.length - 1].recipe.images?.REGULAR.url} alt='image from last saved favourite recipe' />
            </div>
            
            <div className="profileright">
                <span>Favourite Recipes</span>
                <ul>
                    {props.user.favouriteRecipes.map((item, i) => item[i])}
                </ul>
            </div>
        </div>

    </div>
}