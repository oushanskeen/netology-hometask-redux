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

const Form = ({ state, onSaveRecord, onDeleteRecord }) => {
  const [formState, setFormState] = useState({
    input: ["", ""],
    onEdit: "",
    filter: ""
  });
  const { store } = state;
  const { input, onEdit, filter } = formState;

  console.log("STATE IN FORM: ", state);
  console.log("INPUT IN FORM: ", input);
  const formDispatch = (msg, pld) => {
    switch (msg) {
      case "INPUT_TASK":
        console.log("formDispatch input: ", msg, pld);
        setFormState({ ...formState, input: [pld, input[1]] });
        return;
      case "INPUT_PRICE":
        setFormState({ ...formState, input: [input[0], pld] });
        return;
      case "CANCEL_EDIT":
        setFormState({ ...formState, onEdit: "", input: ["", ""] });
        return;
      case "START_EDIT":
        console.log("ON START EDIT pld==: ", pld);
        setFormState({
          ...formState,
          onEdit: pld.id,
          input: [pld.task, pld.price]
        });
        return;
      case "FILTER_RECORDS":
        setFormState({ ...formState, filter: pld });
        return;
      default:
        return;
    }
  };
  return (
    <>
      {JSON.stringify(state)}
      <br />
      {JSON.stringify(formState)}
      <br />
      <div style={box}>
        filter:
        <input
          onChange={e => formDispatch("FILTER_RECORDS", e.target.value)}
          value={filter}
        />
      </div>
      <div style={box}>
        <input
          onChange={e => formDispatch("INPUT_TASK", e.target.value)}
          value={input[0]}
        />
        <input
          onChange={e => formDispatch("INPUT_PRICE", e.target.value)}
          value={input[1]}
        />
        <button
          onClick={() => {
            onSaveRecord({
              id: onEdit || Date.now(),
              task: input[0],
              price: input[1]
            });
            setFormState({ ...formState, input: ["", ""], onEdit: "" });
          }}
        >
          save
        </button>
        <button onClick={() => formDispatch("CANCEL_EDIT")}>cancel</button>
      </div>
      <div style={boxCol}>
        {store
          .filter(e0 =>
            filter === "" ? e0 : e0.task === filter || e0.price === filter
          )
          .map(e => (
            <div style={tinyBox}>
              {JSON.stringify(e)}
              <button onClick={() => formDispatch("START_EDIT", e)}>
                edit
              </button>
              <button onClick={() => onDeleteRecord(e.id)}>delete</button>
            </div>
          ))}
      </div>
    </>
  );
};
const mapStateToProps = _state => ({
  state: _state.form
});
const mapDispatchToProps = _dispatch => ({
  onSaveRecord: data => _dispatch(actions.saveRecord(data)),
  onDeleteRecord: data => _dispatch(actions.deleteRecord(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
