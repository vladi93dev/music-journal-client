import { useEffect } from 'react';
import './App.css';
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
  
  async function test() {
    const stats = await getStats();
    console.log(stats);
  }

  useEffect(() => {
    test();
  }, []);

  return (
    <></>
  )
}

export default App
