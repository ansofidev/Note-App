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

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Failed to fetch notes:', err));
  }, []);

  return (
    <div className="note-list">
      <h1 className="note-list__title">📒 My notes</h1>
      {notes.length === 0 ? (
        <p className="note-list__empty">You don't have any notes yet.</p>
      ) : (
        <ul className="note-list__items">
          {notes.map(note => (
            <li key={note.id} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="note-card__date">
                <small>🕓 {new Date(note.updatedAt).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
