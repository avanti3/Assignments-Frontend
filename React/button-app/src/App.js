import "./App.css";

function App() {
  const msg = () => {
    alert("You clicked the button, Avanti!");
  };

  return (
    <div className="App">
      <button className="btn" onClick={msg}>
        Click Me!
      </button>
    </div>
  );
}

export default App;
