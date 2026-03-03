import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MorePGs from './pages/MorePGs';
import Contact from './pages/Contact';
import PgDetails from './pages/PgDetails';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/morepgs" element={<Layout><MorePGs /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/pg/:id" element={<Layout><PgDetails /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
