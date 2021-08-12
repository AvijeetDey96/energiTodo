import * as actions from "./todo.actions";
const INITIAL_STATE = {
  categories: [],
  todos: [],
  iconList: [],
  selectedCategoryId: '',
  selectedCategoryName: '',
  selectedCategory: ''

};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.ADD_CATEGORY:

      return {
        ...state,
        categories: [...state.categories, action.payload],
        selectedCategory: [action.payload],
        selectedCategoryId:action.payload.id
      };
    case actions.GET_INITIAL_CATEGORY:
      return {
        ...state,
        // categories:[...state.categories,{id:0,name:'default',icon:'TaskTwoTone'}]
      };
    case actions.GET_ICONS:
      let icons = ['TaskTwoTone', 'AddAlert', 'AssignmentTurnedInTwoTone', 'TaskAltTwoTone', 'NotificationsActive', 'NewReleases']
      return {
        ...state,
        iconList: icons
      };
    case actions.DELETE_CATEGORY:
      const cindex = state['categories'].map(function (e) { return e.id; }).indexOf(action.id);
      const removeCategorisArr = [...state['categories']].filter((category, i) => i !== cindex);
      const newTodos = [...state['todos']].filter((data) => data['cid'] !== action.id)
      return {
        ...state,
        categories: removeCategorisArr,
        todos: newTodos,
        selectedCategory: [removeCategorisArr.slice(-1).pop()]
      };
    
    case actions.ADD_TODO:
      let newArr = [...state['todos'], action.payload]
      console.log('newArr', newArr);
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case actions.UPDATE_TODO:

      const index = state['todos'].map(function (e) { return e.id; }).indexOf(action.payload.id);

      return {
        ...state,
        todos: state.todos.map(
          (content, i) => i === index ? { ...content, data: action.payload.updateValue } : content
        )
      };
    case actions.DELETE_TODO:
      const dindex = state['todos'].map(function (e) { return e.id; }).indexOf(action.id);
      const removeArr = [...state['todos']].filter((todo, i) => i !== dindex);
      console.log('ee', removeArr);
      return {
        ...state,
        todos: removeArr
      };
    case actions.SELECTED_CATEGORY:
      let Cname = state.categories.filter(data => data.id === action.data)
      return {
        ...state,
        selectedCategoryId: action.data,
        selectedCategory: Cname
      };

    case actions.CLEAR_ALL:
      return {
        INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default todoReducer;
