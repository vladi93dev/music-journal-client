import { useEffect } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import { 
  register, 
  login, 
  logout, 
  getEntries,
  createEntry,
  getEntryById, 
  updateEntry, 
  deleteEntry,
  getEntriesGenres,
  getStats
} from './api/index';

function App() {
  const { user, login, logout } = useAuth();


  useEffect(() => {
    console.log(user);
  }, [user]);
  
  async function test() {
    await logout();
  }
  

  return (
    <div>
      <button onClick={test}>Login</button>
    </div>
  )
}

export default App
