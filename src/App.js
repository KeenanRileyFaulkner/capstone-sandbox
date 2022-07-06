import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import AdminContent from './components/AdminContent/AdminContent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import { LoginBox } from './components/AdminContent/AdminContent';
import Dashboard from './components/AdminContent/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<><NavBar titleLinkName='music-player'/><AboutContent /></>} />
        <Route path="/music-player" element={<><NavBar titleLinkName='covers-player'/><PlayerContent /></>} />
        <Route path="/covers-player" element={<><NavBar titleLinkName='about' /><CoversContent /></>} />
        <Route path="/admin" element={<AdminContent />} >
          <Route path="login" element={<LoginBox />} />
          <Route path="dashboard" element={<RequireAuth children={<Dashboard />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

const RequireAuth = ({ children }) => {
  const { authed } = useOutletContext();
  const location = useLocation();

  return authed === true ? children : <Navigate to='/admin/login' replace state={{ path: location.pathname }} />;
}

export default App;