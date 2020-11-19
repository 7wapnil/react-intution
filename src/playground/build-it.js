let toggle = true
const toggleVisibility = () => {
  toggle = !toggle;
  renderApp();
}

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggleVisibility}>{toggle ? "Show Details" : "Hide Details"}</button>
      {toggle || (<p>You need to see something urgent!!!</p>)}
    </div>
  );

  ReactDOM.render(template, appRoot);
}

renderApp();