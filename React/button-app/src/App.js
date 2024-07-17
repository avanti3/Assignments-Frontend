import "./App.css";

function App() {
  const msg = () => {
    alert("Thankyou Avanti for clicking me!");
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
