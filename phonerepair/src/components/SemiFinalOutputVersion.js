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

const stub = ["banana", "apple", "pineapple", "beef"];

const Form = ({ state, onSaveInput, onEditInput, onCancelInput }) => {
  const [model, setModel] = useState({
    input: ["", ""],
    store: [],
    filter: "",
    onEdit: 0
  });
  const { input, store, filter, onEdit } = model;

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
  const handleEditClick = e => () =>
    setModel({ ...model, input: [e.task, e.price], onEdit: e.id });
  // on DELETE_RECORD
  const handleDeleteClick = (e, i) => () =>
    setModel({ ...model, store: store.filter((e1, i1) => e.id !== onEdit) });

  //DISPATCHER


  return (
    <>
      {JSON.stringify(model)}
      <div style={box}>
        filter:
        <input onChange={handleFilterInput} value={filter} />
      </div>
      <div style={box}>
        <input onChange={handleTaskInput} value={input[0]} />
        <input onChange={handlePriceInput} value={input[1]} />
        <button onClick={handleSaveClick}>save</button>
        <button onclick={handleCancelClick}>cancel</button>
      </div>
      <div style={boxCol}>
        {store
          .filter(e0 =>
            filter === "" ? e0 : e0.task === filter || e0.price === filter
          )
          .map((e, i) => (
            <div style={tinyBox}>
              {JSON.stringify(e)}
              <button onClick={handleEditClick(e)}>edit</button>
              <button onClick={handleDeleteClick(e, i)}>delete</button>
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
  onSaveInput: data => _dispatch(actions.saveInput(data)),
  onEditInput: data => _dispatch(actions.editRecord(data)),
  onCancelInput: data => _dispatch(actions.cancelInput())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
