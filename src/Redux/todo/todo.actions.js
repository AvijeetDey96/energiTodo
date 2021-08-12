

export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_ICONS = "GET_ICONS";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
 export const GET_INITIAL_CATEGORY = "GET_INITIAL_CATEGORY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const RESET_ALL = "RESET_ALL"
export const CLEAR_ALL = "CLEAR_ALL"


export const getIcons = () => ({
  type: GET_ICONS,
})

export const addCategery = payload => ({
  type: ADD_CATEGORY,
  payload: payload
})

export const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  id:id
})

export const getInitialCategory = () => ({
  type: GET_INITIAL_CATEGORY,
})
export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload: payload
})

export const updateTodo = (payload) => ({
  type: UPDATE_TODO,
  payload: payload
})
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id: id
})

export const selectedCategory = (data) => ({
  type: SELECTED_CATEGORY,
  data: data
})


export function clearAllData() {
  return {
    type: CLEAR_ALL
  };
}

