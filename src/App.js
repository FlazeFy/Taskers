import './App.css';

function App() {
  return (
    <div className='container bg-white rounded shadow d-block mx-auto p-3'>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <b className="navbar-brand" href="#">Taskers</b>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Tasks</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Calendar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Teams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Rewards</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
