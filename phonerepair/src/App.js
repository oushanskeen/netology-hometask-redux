import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";

const box = {
  display:"flex",
  padding:10,
  margin:10,
  border:"2px solid grey"
};
const boxCol = {
  ...box,
  flexDirection:"column"
};

function App() {
  return (
    <div style={boxCol}>
      <Form/>
    </div>
  );
}

export default App;
