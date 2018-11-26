<template>

  <div class="parent-container">
    <div class="inputNav">
      <input type="text" class="notes-input" placeholder="Add notes here" v-model="newNotes"
      @keyup.enter="addNote">
      <button type="button" class="addButton" @click="addNote">+</button>
    </div>
    <div class="masonry" id="masonry" v-if="notes.length">
      <div v-for="(note, index) in reorder()" :key="note._id" class="note-container">
        <div>
          {{ note.content }}
        </div>
        <div class="remove-note" v-on:click.once="removeNote(index)">x</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Notes',
  data () {
    return {
      newNotes : '',
      notesID: 8,
      // Existing data to be re-ordered
      notes: [
        {
          'id': 0,
          'title': 'My first note here',
        },
        {
          'id': 1,
          'title': 'My second note here',
        },
        {
          'id': 2,
          'title': 'My third note here',
        },
        {
          'id': 3,
          'title': 'My fourth note here',
        },
        {
          'id': 4,
          'title': 'My fifth note here',
        },
        {
          'id': 5,
          'title': 'My sixth note here',
        },
        {
          'id': 6,
          'title': 'My seventh note here',
        },
        {
          'id': 7,
          'title': 'My eigth note here',
        }
      ],
      colCount : 0,
      oldCol: 0,
      isMounted: false
    }
  },
  mounted() {
    // test for mount
    this.isMounted = true;
    if (!this.isMounted == true) {
      return null;
    } else {
      const self = this;
      this.getNotes(function() {
        self.notes.reverse();   // reverses array before reorder
        self.getColumn();
        self.$nextTick(function() {
          console.log("Tick!");
          self.reorder(self.notes);    // reorder when mounted
          window.addEventListener('resize', self.getColumn);
          window.addEventListener('resize', self.getOrder);
        })
      })

    }
  },

  methods: {
    getNotes(callback) {
      fetch('http://localhost:3000/api/Note/list', {
        method: 'GET',
      })
        .then(res => res.json())
        .then((res) => {
          const notes = res.results;

          this.notes = notes;
          return callback();
        })
    },
    // adds new note via input
    addNote() {
      if (this.newNotes.trim() == 0) {    // trims whitespace and checks remaining value
        return    // early return if empty
      }
      const body = {
        content: this.newNotes,
      };
      fetch('http://localhost:3000/api/Note/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error));

      this.notes.unshift({
        content: this.newNotes,
      })
      this.newNotes = '';
      this.notesID++;
      this.reorder();    // reorder when mounted
    },

    // removes note at index
    removeNote(index) {
      this.notes.splice(index, 1);
      this.reorder(this.notes);    // reorder when mounted
    },

    // reorders notes based on column count
    reorder() {
      let columnCount = Number(this.colCount);
      let noteCount = this.notes.length;
      let newIndex = 0;   // index for new order
      let colPointer = 1;   // pointer to keep track of columns
      const sortedNotes = [];    // empty array for reorder

      for (let i = 0, len = this.notes.length; i < len; i++) {

        // when the column is filled reset index based on column pointer
        if (newIndex >= this.notes.length) {
          newIndex = colPointer;
          colPointer++;
        }
        sortedNotes.push(this.notes[newIndex]);   // migrates each array object to new array based on new order
        newIndex+= columnCount;   // update index based on columnCount
      }
      return sortedNotes;
    },

    // reactive updating for column count
    getColumn (event) {
      let elem = document.getElementById("masonry");    // grabs & stores element
      let cols = getComputedStyle(elem);    // stores all css properties of the element
      this.colCount = cols.columnCount;   // updates value of column count
      console.log("Changed cols!");
      return this.colCount;
    },

    getOrder() {
      let col = this.oldCol;
      if (col !== this.colCount) {    // update on column change only
        this.reorder(this.notes);
        this.oldCol = this.colCount;    // update column count
      }
    }
  },
}
</script>

<style lang="scss">

  $button-color: #f1c40f;

  .parent-container {
    margin: 0px 30px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .masonry {
    column-count: 4;
    column-gap: 6.66667px;
  }
  /* Masonry on large screens */
  @media only screen and (min-width: 1024px) {
    .masonry {
      column-count: 4;
    }
  }

  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .masonry {
      column-count: 3;
    }
  }

  /* Masonry on small screens */
  @media only screen and (max-width: 767px) and (min-width: 540px) {
    .masonry {
      column-count: 2;
    }
  }

  .inputNav {
    margin-bottom: 1.75em;
    display: flex;
    flex-direction: row;
  }

  .notes-input {
    width: 90vw;
    padding: 20px 0;
    margin: 70px 30px 50px 0px;
    text-align: center;
    color: #fff;
    background: #34495e;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
  }

  .note-container {
    height: auto;
    border: 0.15px solid #bdc3c7;
    padding: 1em;
    margin: 0 0 0.5em;
    break-inside: avoid;
    background: #34495e;
    color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  .note-container:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
  }

  .remove-note {
    cursor: pointer;
    margin-left: 90%;
  }

  .addButton {
    height: 61px;
    width: 61px;
    overflow: hidden;
    margin: auto;
    margin-top: 70px;
    padding: 0;
    border-radius: 60px;
    border: 1px solid;
    font-size: 35px;
    color: $button-color;
    background: transparent;
    transition: background-color 0.3s ease-in;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: #fff;
      background: $button-color;
      border: 0px;
    }
  }

</style>
