import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  noteType: {
    type: String,
    required: true,
    dropDupes: false,
    default: 'text',
  },
  content: {
    type: String,
    required: true,
    dropDupes: false,
  },
  tags: {
    type: [mongoose.Schema.ObjectId],
    required: false,
    dropDupes: false,
    ref: 'Tag',
  },

});

const Note = mongoose.model('Note', NoteSchema);

export default Note;
