import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    dropDupes: false,
  },
  notes: {
    type: [mongoose.Schema.ObjectId],
    required: false,
    dropDupes: false,
    ref: 'Note',
  },
  
});

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;
