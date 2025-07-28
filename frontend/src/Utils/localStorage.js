export const addFavoriteToLocalStorage=(product)=>{
    const favorites=getFavoritesFromLocalStrorage()
    if(!favorites.some((p)=>p._id===product._id)){
        favorites.push(product)
        localStorage.setItem('favorites',JSON.stringify(favorites))
    }
}

export const removeFavoriteFromLocalStorage=(productId)=>{
    const favorites=getFavoritesFromLocalStrorage()
    const updateFavorites=favorites.filter((product)=>product._id
!==productId)
    localStorage.setItem('favorites',JSON.stringify(updateFavorites));
}

export const getFavoritesFromLocalStrorage=()=>{
    const favoritesJSON=localStorage.getItem('favorites')
    return favoritesJSON?JSON.parse(favoritesJSON):[]
}