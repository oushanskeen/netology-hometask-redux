import logo from './logo.svg';
import './App.css';

const box = {
  display:"flex",
  //width:"500",
  padding:10,
  margin:10,
  border:"2px solid grey"
};
const boxCol = {
  ...box,
  flexDirection:"column"
};

const stub = ["banana","apple","pineapple","beef"];

function App() {
  return (
    <div style={boxCol}>
      <div style={box}>
        <input/>
        <input/>
        <button>save</button>
      </div>
      <div style={boxCol}>
        {stub.map(e => (
          <div>
            {e}
              <button>edit</button>
              <button>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
