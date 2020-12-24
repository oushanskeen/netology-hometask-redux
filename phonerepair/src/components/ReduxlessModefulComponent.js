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

const stub = ["banana", "apple", "pineapple", "beef"];

const Form = ({ state, onSaveInput, onEditInput, onCancelInput }) => {
  const [model, setModel] = useState({
    input: ["", ""],
    store: [],
    filter: ""
  });
  const { input, store, filter } = model;
  return (
    <>
      {JSON.stringify(model)}
      <div>
        <input
          onChange={e => setModel({ ...model, filter: e.target.value })}
          value={filter}
        />
      </div>
      <div style={box}>
        <input
          onChange={e =>
            setModel({
              ...model,
              input: [e.target.value, input[1]]
            })
          }
          value={input[0]}
        />
        <input
          onChange={e =>
            setModel({
              ...model,
              input: [input[0], e.target.value]
            })
          }
          value={input[1]}
        />
        <button
          onClick={e =>
            setModel({
              input: ["", ""],
              store: [...store, [...input]]
            })
          }
        >
          save
        </button>
        <button onClick={() => setModel({ ...model, input: ["", ""] })}>
          cancel
        </button>
      </div>
      <div style={boxCol}>
        {model.store
          .filter(e0 =>
            filter === "" ? e0 : e0[0] === filter || e0[1] === filter
          )
          .map((e, i) => (
            <div>
              {JSON.stringify(e)}
            <button
                onClick={() => setModel({ ...model, input: [e[0], e[1]] })}
              >
                edit
              </button>
              <button
                onClick={() =>
                  setModel({
                    ...model,
                    store: store.filter((e1, i1) => i1 !== i)
                  })
                }
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
  onSaveInput: data => _dispatch(actions.saveInput(data)),
  onEditInput: data => _dispatch(actions.editRecord(data)),
  onCancelInput: data => _dispatch(actions.cancelInput())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
