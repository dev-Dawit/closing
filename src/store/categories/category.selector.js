// we took the basic form of our data from firestore(the docs) and store it in the reducer
// then we took the logic that transforms the docs into a categoriesMap into a selector.


//before it was pulling off the value now its transforming the value
export const selectCategoriesMap = (state) => 
    state.categories.categories.reduce((accum, category) => {    
    const { title, items} = category;       
    accum[title.toLowerCase()] = items;               
    return accum;
  }, {})   