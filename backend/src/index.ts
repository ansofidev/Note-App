import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const NOTES_PATH = path.join(__dirname, '..', 'notes.json');

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const readNotes = (): Note[] => {
  try {
    return JSON.parse(fs.readFileSync(NOTES_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

const writeNotes = (notes: Note[]) => {
  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));
};

app.get('/notes', (_req: Request, res: Response) => {
  const notes = readNotes();
  res.json(notes);
});

app.post(
  '/notes',
  (req: Request<{}, {}, { title: string; content: string }>, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required.' });
      return;
    }

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json(newNote);
  }
);

app.put(
  '/notes/:id',
  (
    req: Request<{ id: string }, {}, { title: string; content: string }>,
    res: Response
  ) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required.' });
      return;
    }

    const notes = readNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      res.status(404).json({ message: 'Note not found.' });
      return;
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    writeNotes(notes);

    res.status(200).json(notes[noteIndex]);
  }
);

app.delete('/notes/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const notes = readNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    res.status(404).json({ message: 'Note not found.' });
    return;
  }

  const deletedNote = notes.splice(noteIndex, 1)[0];
  writeNotes(notes);

  res.status(200).json(deletedNote);
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
