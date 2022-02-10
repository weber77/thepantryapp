import React from 'react';

export default function Recipe({ recipe }) {
    console.log('recipe: ', recipe.recipe)

    return (
        <div style={{ maxWidth: '30vw' }}>
            <img style={{ borderRadius: '10%', maxHeight: '200px' }}
                src={recipe.recipe.images.SMALL
                    ? recipe.recipe.images.SMALL.url
                    : recipe.recipe.image}
            />
            
            <a
                style={{
                    textDecoration: 'none',
                    color: 'black',
                    textAlign: 'center'
                }}
                href={recipe.recipe.url}>
                <h3>{recipe.recipe.label}</h3>
            </a>
        </div>
    )
}