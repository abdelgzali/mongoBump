import Note from './Note.js';
import Tag from './Tag.js';

export default {
  Note,
  Tag,
  generate(context) {
    const keys = Object.keys(this);
    keys.forEach((key) => {
      if (
        key !== 'generate'
      ) {
        console.log(key);
        this[key].generate(context);
      }
    });
  },
};
