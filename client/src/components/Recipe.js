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
        <div style={{ maxWidth: '30vw', textAlign: 'center', wordWrap:'break-word', padding:'15px' }}>
            <img style={{ borderRadius: '10%', maxHeight: '200px' }}
                src={props.recipe.recipe.images.SMALL
                    ? props.recipe.recipe.images.SMALL.url
                    : props.recipe.recipe.image}
                alt='food that corresponds to each recipe'
            />

            <a
                style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                href={props.recipe.recipe.url}
                target='blank'>
                <h3 style={{fontSize: '20px', fontWeight:'lighter', textDecoration:'unerline', display:'flex', flexWrap:'wrap', maxWidth: '15vw', justifyContent:'center', alignItems:'center'}}>{props.recipe.recipe.label}</h3>
            </a>


            {props.isLoggedIn &&
                (props.user.favouriteRecipes.some((r) => r.recipe.url === props.recipe.recipe.url)
                    ? <button onClick={removeFav} className='favouritebtn'>
                        <img src='yellowstar.png' alt='yellow star'/>
                    </button>
                    : <button onClick={addFav} className='favouritebtn'>
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