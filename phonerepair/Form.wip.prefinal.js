import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

const box = {
  display: "flex",
  padding: 10,
  margin: 10,
  border: "2px solid grey"
};
const boxCol = {
  ...box,
  flexDirection: "column"
};
const tinyBox = { ...box, padding: 5 };

const Form = ({ 
  state,
  onFilterRecords,
  onAddTask,
  onAddPrice,
  onSaveRecord,
  onCancelEdit,
  onEditRecord,
  onDeleteRecord,
  onCancelInput
  }) => {
  /*
  const [model, setModel] = useState({
    input: ["", ""],
    store: [],
    filter: "",
    onEdit: 0
  });
  */
  //const { input, store, filter, onEdit } = model;
  const { input, store, filter, onEdit } = state;

  /*
  // REDUCERS
  //
  // on FILTER_RECORDS
  const handleFilterInput = e => setModel({ ...model, filter: e.target.value });
  // on ADD_TASK
  const handleTaskInput = e =>
    setModel({ ...model, input: [e.target.value, input[1]] });
  // on ADD_PRICE
  const handlePriceInput = e =>
    setModel({ ...model, input: [input[0], e.target.value] });
  // on SAVE_RECORD
  const handleSaveClick = () =>
    setModel({
      ...model,
      input: ["", ""],
      store:
        store.filter(e => e.id === onEdit).length === 0
          ? [...store, { id: Date.now(), task: input[0], price: input[1] }]
          : [
              ...store.filter(e => e.id !== onEdit),
              {
                id: store.filter(e => e.id === onEdit)[0].id,
                task: input[0],
                price: input[1]
              }
            ]
    });
  // on CANCEL_EDIT
  const handleCancelClick = () => setModel({ ...model, input: ["", ""] });
  // on EDIT_RECORD
  const handleEditClick = e =>
    setModel({ ...model, input: [e.task, e.price], onEdit: e.id });
  // on DELETE_RECORD
  const handleDeleteClick = e =>
    setModel({ ...model, store: store.filter(e1 => e.id !== e1.id) });
    
   
  //DISPATCHER
  //const dispatch = (/*model, { type, payload }) => {
    switch (type) {
      case "FILTER_RECORDS":
        handleFilterInput(payload);
        return;
      case "ADD_TASK":
        handleTaskInput(payload);
        return;
      case "ADD_PRICE":
        handlePriceInput(payload);
        return;
      case "SAVE_RECORD":
        handleSaveClick();
        return;
      case "CANCEL_EDIT":
        handleCancelClick();
        return;
      case "EDIT_RECORD":
        handleEditClick(payload);
        return;
      case "DELETE_RECORD":
        handleDeleteClick(payload);
        return;
      default:
        return model;
    }
  };
  */
  return (
    <>
      {JSON.stringify(model)}
      <div style={box}>
        filter:
        <input
          onChange ={e => onFilterRecords(e)}
          value={filter}
        />
      </div>
      <div style={box}>
        <input
          onChange={e => onAddTask(e)}
          value={input[0]}
        />
        <input
          onChange={e => onAddPrice(e)} 
          value={input[1]}
        />
        <button
          onClick={() => onSaveRecord()}
        >save</button>
        <button 
          onClick={() => onCancelEdit()}
        >cancel</button>
      </div>
      <div style={boxCol}>
        {store
          .filter(e0 =>
            filter === "" ? e0 : e0.task === filter || e0.price === filter
          )
          .map(e => (
            <div style={tinyBox}>
              {JSON.stringify(e)}
              <button
                onClick={e => onEditRecord(e)}
              >
                edit
              </button>
              <button
                onClick={e => onDeleteRecord(e)}
              >
                delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
const mapStateToProps = _state => ({
  state: _state
});
const mapDispatchToProps = _dispatch => ({
  onFilterRecords: data => _dispatch(actions.filterRecords(data)),
  onAddTask: data => _dispatch(actions.addTask(data)),
  onAddPrice: data => _dispatch(actions.addPrice(data)),
  onSaveRecord: () => _dispatch(actions.saveRecord()),
  onCancelEdit: data => _dispatch(actions.cancelEdit()),
  onEditRecord: data => _dispatch(actions.editRecord(data)),
  onDeleteRecord: data => _dispatch(actions.deleteRecord(data)),
  onCancelInput: data => _dispatch(actions.cancelInput())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
