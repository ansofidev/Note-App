import './App.scss';
import { NoteList } from './components/NoteList/NoteList'
import { NoteForm } from './components/NoteForm/NoteForm';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  const reloadNotes = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app">
      <NoteForm onNoteCreated={reloadNotes} />
      <NoteList key={refresh.toString()} />
    </div>
  );
}

export default App;
