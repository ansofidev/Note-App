import { useState } from 'react';
import './NoteForm.scss';

type Props = {
  onNoteCreated: () => void;
};

export const NoteForm = ({ onNoteCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('https://note-app-4xg5.onrender.com/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      setTitle('');
      setContent('');
      setError('');
      onNoteCreated();
    } catch (error) {
      console.error(error);
      setError('Unable to create note.');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2 className="note-form__title">📝 New Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Note content"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p className="note-form__error">{error}</p>}

      <button type="submit">Save</button>
    </form>
  );
};
