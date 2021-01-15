import {
  SAVE_RECORD,
  DELETE_RECORD,
} from "../messages/messages";

const initialState = {
  store:[
    {id:"0",task:"task1",price:"price1"},
    {id:"1",task:"task2",price:"price2"},
    {id:"2",task:"task3",price:"price3"},
    {id:"3",task:"task4",price:"price4"}
  ],
  filter:"",
  input:["",""],
  onEdit:""
};

export default function (state = initialState, action){
  const {store,filter,input,onEdit} = state; 
  const { type, payload } = action;
  console.log("DISPATCHER RECEIVED ACTION: ", action);
  switch (type) {
    case SAVE_RECORD:
      console.log("DISPATCHER RECEIVED SAVE_RECORD MESSAGE");
      return {
        ...state,
        //input: ["", ""],
        store:
          store.filter(e => e.id === payload.id).length === 0
            ? [...store, {...payload}]
            : [ 
                ...store.filter(e => e.id !== payload.id),
                {...payload}
              ]
      };
    case DELETE_RECORD:
      console.log("DELETE ACTION TRIGGERED WITH VALUEL: ", payload);
      return { ...state, store: store.filter(e => payload !== e.id) };
    default:
      return state;
  }
};
