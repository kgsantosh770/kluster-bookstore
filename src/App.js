import Navbar from './components/Navbar/Navbar';
import Detailpage from './pages/Detailpage/Detailpage';
import Homepage from './pages/Homepage/Homepage'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='page-content' style={{padding: '1rem'}}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book/:id" element={<Detailpage />} />
          <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404: Page Not Fount</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
