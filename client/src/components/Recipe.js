import React from 'react';

export default function Recipe(props) {
    // console.log('recipe: ', recipe.recipe)

    const handleFav = () => {
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
            {/* {props.isLoggedIn && <button onClick={handleFav}>
                <img src={props.user.favouriteRecipes.includes(props.recipe.recipe)
                    ? 'yellowstar.png'
                    : "https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-favourite-music-dreamstale-lineal-dreamstale.png"} />
            </button>} */}

        </div>
    )
}