import './App.css';
import Routing from './Components/Routing';
import CommonAppBar from './Components/CommonAppBar';
import LoginTemp from './Temp/LoginTemp';
import CreateIncident from './User/CreateIncident';
import Dashboard from './User/Dashboard';
import FullPage from './User/FullPage';
import Incidents from './User/Incidents';
import LoginPage from './Components/LoginPage';
import Stats from './Temp/Stats';
import AdminDashboard from './Admin/AdminDashboard';
import StatusPieChart from './Admin/StatusPieChart';
import HistoryPage from './Admin/HistoryPage';
import HomePage from './Components/HomePage';
import UpdateIncident from './Admin/UpdateIncident';

function App() {
  return (
    <div>
      <Routing></Routing>
     
    </div>
  );
}

export default App;
