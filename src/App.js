import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ToDoList from './Components/TODoList';
import WelcomePage from './Components/WelcomePage';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/todo" element={<ToDoList/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
