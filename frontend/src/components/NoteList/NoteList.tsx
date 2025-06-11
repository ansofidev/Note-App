import { useEffect, useState } from 'react';
import { NoteCard, Note } from '../NoteCard/NoteCard';
import './NoteList.scss';

export const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(false); // false = newest first

  const fetchNotes = async () => {
    try {
      const res = await fetch('https://note-app-4xg5.onrender.com/notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (id: string) => {
    fetch(`https://note-app-4xg5.onrender.com/notes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Delete failed');
        setNotes(notes.filter((n) => n.id !== id));
      })
      .catch(console.error);
  };

  const handleUpdate = (updated: Note) => {
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  };

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  return (
    <div className="note-list">
      <h1 className="note-list__title">📒 My Notes</h1>

      <div className="note-list__controls">
        <input
          className="note-list__search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="note-list__sort-button"
          onClick={() => setSortAsc(!sortAsc)}
        >
          Sort by date {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      {loading ? (
        <p className="note-list__empty">Loading...</p>
      ) : filteredNotes.length === 0 ? (
        <p className="note-list__empty">No matching notes found.</p>
      ) : (
        <ul className="note-list__items">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
