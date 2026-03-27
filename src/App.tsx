import './App.css';
import { 
  register, 
  login, 
  logout, 
  getEntries,
  createEntry 
} from './api/index';

function App() {
  
  async function test() {
   await createEntry({title: 'The Great Annihilator', artist: 'Swans', genre: 'Rock', rating: 9, note: 'Favorite Swans album'})
  }

  test();

  return (
    <></>
  )
}

export default App
