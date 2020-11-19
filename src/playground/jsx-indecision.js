console.log('App.js running')

const app = {
  title: 'Indecision',
  subTitle: 'Managing your tasks',
  options: []
}

const onFormSubmit = (e) => {
  e.preventDefault();

  let option = e.target.elements.option.value;
  if(option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
}

const onRemoveAll = () => {
  app.options = []
  renderApp();
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
}

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1 id="title">{app.title}</h1>
      {app.subTitle && <p>{app.subTitle}</p>}
      <p>{(app.options.length > 0) ? "Options list" : "No Options"}</p>
      <p>{app.options.length}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAll}>Remove all</button>
      <ol>
        {
          app.options.map((option) => {
            return <li key={option}>{option}</li>;
          })
        }
      </ol>
  
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot)
}

renderApp();
