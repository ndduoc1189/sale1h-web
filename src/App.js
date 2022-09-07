import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Search from './Page/Search';
import { DefaultLayout } from '~/Components/Layouts';
function App() {
  return (
    <Router>
      <div className="App">
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </DefaultLayout>
      </div>
    </Router>
  );
}

export default App;
