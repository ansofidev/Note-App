import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const NOTES_PATH = path.join(__dirname, '..', 'notes.json');

const readNotes = (): any[] => {
  try {
    const data = fs.readFileSync(NOTES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

app.get('/notes', (_req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
