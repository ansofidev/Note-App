import { useEffect, useState } from 'react';
import './NoteList.scss';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:3001/notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3001/notes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="note-list">
      <h1 className="note-list__title">📒 My Notes</h1>

      <input
        className="note-list__search"
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="note-list__empty">Loading...</p>
      ) : filteredNotes.length === 0 ? (
        <p className="note-list__empty">No matching notes found.</p>
      ) : (
        <ul className="note-list__items">
          {filteredNotes.map((note) => (
            <li key={note.id} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="note-card__footer">
                <small>🕓 {new Date(note.updatedAt).toLocaleString()}</small>
                <button
                  className="note-card__delete"
                  onClick={() => handleDelete(note.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
