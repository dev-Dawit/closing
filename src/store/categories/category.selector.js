// we took the basic form of our data from firestore(the docs) and store it in the reducer
// then we took the logic that transforms the docs into a categoriesMap into a selector.

import { createSelector } from "reselect";

const selectCategoryReducer = state => state.categories;    //is like saying rootReducer.categories

export const selectCatagories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories       //is like saying rootReducer.categories.categories. from rootReducer select categoriesReducer, from categoriesReducer select categories state property
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading        //is like saying rootReducer.categories.isLoading. from the entire state, select the categories slice, from the categories state properties select isLoading property
)

export const selectCategoriesMap = createSelector(
  [selectCatagories],                                  //select categories property(categories: []) from the categoriesReducer
  (categories) => categories.reduce((accum, category) => {    
    const { title, items} = category;       
    accum[title.toLowerCase()] = items;               
    return accum;
  }, {})  
)  
