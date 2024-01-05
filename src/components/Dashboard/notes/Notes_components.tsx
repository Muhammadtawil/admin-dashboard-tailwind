"use client"
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import './notes_style.css'
// const Note: React.FC<{ children: string; index: number; onChange: (newText: string, index: number) => void; onRemove: (index: number) => void }> = ({
//   children,
//   index,
//   onChange,
//   onRemove,
// }) => {
//   const [checked, setChecked] = useState(false);
//   const [editing, setEditing] = useState(false);

//   const style = {
//     right: `${randomBetween(0, window.innerWidth - 150)}px`,
//     top: `${randomBetween(0, window.innerHeight - 150)}px`,
//     transform: `rotate(${randomBetween(-15, 15)}deg)`,
//     backgroundColor: 'yellow',
//   };
  
  
//   function randomBetween(min: number, max: number): number {
//     return min + Math.ceil(Math.random() * max);
//   }

//   function edit() {
//     setEditing(true);
//   }

//   function save() {
//     onChange((document.getElementById(`newText-${index}`) as HTMLInputElement).value, index);
//     setEditing(false);
//   }

//   function remove() {
//     onRemove(index);
//   }

//   return (
//     <div className="note dark:bg-meta-3 dark:text-black" style={style}>
//       {editing ? (
//         <div>
//           <textarea defaultValue={children} id={`newText-${index}`} className="form-control"></textarea>
//           <button className="btn btn-success btn-sm" onClick={save}>
//             Save
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>{children}</p>
//           <span>
//             <button className="btn btn-primary" onClick={edit}>
//               Edit
//             </button>
//             <button className="btn btn-danger" onClick={remove}>
//               Delete
//             </button>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// interface BoardProps {
//   count?: number;
// }

// const Board: React.FC<BoardProps> = ({ count }) => {
//   const [notes, setNotes] = useState<{ id: number; note: string }[]>([]);

//   function nextId(): number {
//     return notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
//   }

//   function update(newText: string, i: number): void {
//     setNotes((prevNotes) =>
//       prevNotes.map((note, index) => (index === i ? { ...note, note: newText } : note))
//     );
//   }

//   function remove(index: number): void {
//     setNotes((prevNotes) => {
//       const removedNote = prevNotes[index];
//       const updatedNotes = [...prevNotes.slice(0, index), ...prevNotes.slice(index + 1)];
//       return updatedNotes;
//     });
//   }

//   function add(text: string): void {
//     setNotes((prevNotes) => [...prevNotes, { id: nextId(), note: text }]);
//   }

//   React.useEffect(() => {
//     if (count) {
//       fetch(`http://baconipsom.com/api/?type=all-meat&sentences=${count}&start-with-lorem=1&callback=?`)
//         .then((response) => response.json())
//         .then((results) => {
//           const data = results[0].split('. ');
//           data.forEach((sentence: string) => add(sentence.substring(0, 40)));
//         });
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [count]);

//   return (
//     <div className="board">
//       {notes.map((note, index) => (
//         <Note key={note.id} index={index} onChange={update} onRemove={remove}>
//           {note.note}
//         </Note>
//       ))}
//       <button className="btn btn-sm" onClick={() => add('New Note!')}>
//         +
//       </button>
//     </div>
//   );
// };

// Board.propTypes = {
//   count: (props: any, propName: string) => {
//     if (typeof props[propName] !== 'number') {
//       return new Error('The count property must be a number');
//     }
//     if (props[propName] > 100) {
//       return new Error(`Creating ${props[propName]} notes is ridiculous`);
//     }
//     return null;
//   },
// };

// const NotesComponent: React.FC = () => {
//   return (
//       <>
//                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <Board count={50} />
              
//            </div>
//     </>
//   );
// };

// export default NotesComponent;

import React, { useState } from 'react';
import styled from 'styled-components';
import './notes_style.css';

const NotesWrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  body {
    background: url(https://subtlepatterns.com/patterns/little_pluses.png) #cacaca;
    margin: 30px;
  }

  #create,
  .note-container {
    float: left;
    margin: 0 20px 20px 0;
  }

  #create {
    user-select: none;
    padding: 30px; /* Adjust padding for the sticky note */
    border-radius: 20px;
    text-align: center;
    border: 15px solid ;
    cursor: pointer;
    // color: rgba(0, 0, 0, 0.1);
    font: 80px 'Helvetica', sans-serif;
    line-height: 80px;
  }

  #create:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.2);
  }

  .note-container {
    display: flex;
    flex-direction: column;
  }

  textarea {
    font: 16px 'Gloria Hallelujah', cursive;
    line-height: 1.5;
    border: 0;
    border-radius: 3px;
    background: linear-gradient(#F9EFAF, #F7E98D);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: box-shadow 0.5s ease;
    font-smoothing: subpixel-antialiased;
    width: 350px; /* Adjust width for the textarea */
    height: 200px; /* Adjust height for the textarea */
    resize: none;
  }

  textarea:hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
  }

  textarea:focus {
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    align-self: flex-end;
  }
`;

const NotesComponent = () => {
  const [notes, setNotes] = useState(['This is a sticky note you can type and edit.']);

  const handleCreateClick = () => {
    // Create a new note with default content
    const newNotes = [...notes, 'New Note'];
    setNotes(newNotes);
  };

  const handleNoteChange = (index:any, value:any) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const handleNoteDelete = (index:any) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

    return (
       
    <NotesWrapper>
      <div id="create" onClick={handleCreateClick} className='text-black border-black dark:text-white dark:border-white '>
        +
      </div>
      {notes.map((note, index) => (
        <div className="note-container dark:text-black" key={index} >
          <textarea
            value={note}
            onChange={(e) => handleNoteChange(index, e.target.value)}
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          />
          <button className="delete-button" onClick={() => handleNoteDelete(index)}>
            Delete
          </button>
        </div>
      ))}
            </NotesWrapper>
            // </div>
  );
};

export default NotesComponent;


