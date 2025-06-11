import { useState } from 'react';
import './NoteCard.scss';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (updatedNote: Note) => void;
};

export const NoteCard = ({ note, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://note-app-4xg5.onrender.com/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error('Update failed');

      const updatedNote: Note = await res.json();
      onUpdate(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update note:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="note-card">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            disabled={loading}
          />
          <div className="note-card__footer">
            <button onClick={handleSave} disabled={loading}>
              💾 Save
            </button>
            <button onClick={() => setIsEditing(false)} disabled={loading}>
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className="note-card__footer">
            <small>🕓 {new Date(note.updatedAt).toLocaleString()}</small>
            <div>
              <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
              <button onClick={() => onDelete(note.id)}>🗑 Delete</button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
