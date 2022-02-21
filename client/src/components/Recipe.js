import React from 'react';

export default function Recipe(props) {


    const addFav = () => {
        console.log(props)
        try {
            const copy = [...props.user.favouriteRecipes]
            copy.push(props.recipe)
            props.updateUser('favouriteRecipes', copy)
        }
        catch (err) {
            console.error(err)
        }
    }

    const removeFav = () => {

        try {
            const idx = props.user.favouriteRecipes.findIndex(r => r.recipe.url === props.recipe.recipe.url)
            const copy = [...props.user.favouriteRecipes]
            copy.splice(idx, 1)
            props.updateUser('favouriteRecipes', copy)
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={{ maxWidth: '30vw' }}>
            <img style={{ borderRadius: '10%', maxHeight: '200px' }}
                src={props.recipe.recipe.images.SMALL
                    ? props.recipe.recipe.images.SMALL.url
                    : props.recipe.recipe.image}
                alt='images of food that correspond to each recipe'
            />

            <a
                style={{
                    textDecoration: 'none',
                    color: 'black',
                    textAlign: 'center'
                }}
                href={props.recipe.recipe.url}
                target='blank'>
                <h3>{props.recipe.recipe.label}</h3>
            </a>


            {props.isLoggedIn &&
                (props.user.favouriteRecipes.some((r) => r.recipe.url === props.recipe.recipe.url)
                    ? <button onClick={removeFav}>
                        <img src='yellowstar.png' alt='yellow star'/>
                    </button>
                    : <button onClick={addFav}>
                        <img src='icons8-star-50.png' alt='black outline of a star'/>
                    </button>
                )
            }
            {/* {props.isLoggedIn && (<button onClick={addFav}>
                <img src={props.user.favouriteRecipes.some((r) => r.recipe.label === props.recipe.recipe.label)
                    ? 'yellowstar.png'
                    : 'icons8-star-50.png'} /></button>)
            } */}


        </div>
    )
}