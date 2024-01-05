"use client"

import React, { useState } from 'react';
import Draggable from 'react-draggable'; 
import './notestyle.css'
import { TbWorldWww } from "react-icons/tb";

import { FormHead } from '../shared/page_Head';
const Note: React.FC<{ children: string; index: number; onChange: (newText: string, index: number) => void; onRemove: (index: number) => void }> = ({
  children,
  index,
  onChange,
  onRemove,
}) => {
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState(false);

  const style = {
    right: `${randomBetween(150, window.innerWidth/2 - 150)}px`,
      top: `${randomBetween(350, window.innerHeight/2 - 50)}px`,
    left:`${randomBetween(50, window.innerWidth/2 - 50)}px`,
    transform: `rotate(${randomBetween(-15, 15)}deg)`,
  };
  const [initialPosition] = useState({
    right: `${randomBetween(150, window.innerWidth / 2 - 150)}px`,
    top: `${randomBetween(350, window.innerHeight / 2 - 50)}px`,
    left: `${randomBetween(50, window.innerWidth / 2 - 50)}px`,
    transform: `rotate(${randomBetween(-15, 15)}deg)`,
  });

  function randomBetween(min: number, max: number): number {
    return min + Math.ceil(Math.random() * max);
  }

  function edit() {
    setEditing(true);
  }

  function save() {
    onChange((document.getElementById(`newText-${index}`) as HTMLInputElement).value, index);
    setEditing(false);
  }

  function remove() {
    onRemove(index);
  }

    return (
        <Draggable>
    <div className="note dark:text-black" style={initialPosition}>
      {editing ? (
        <div className='dark:text-black'>
          <textarea defaultValue={children} id={`newText-${index}`} className="form-control"></textarea>
          <button className="btn btn-success btn-sm dark:text-black" onClick={save}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>{children}</p>
          <span>
            <button className="btn btn-primary" onClick={edit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={remove}>
              Delete
            </button>
          </span>
        </div>
      )}
            </div>
            </Draggable>
  );
};

interface BoardProps {
  count?: number;
}

const Board: React.FC<BoardProps> = ({ count }) => {
  const [notes, setNotes] = useState<{ id: number; note: string }[]>([]);

  function nextId(): number {
    return notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
  }

  function update(newText: string, i: number): void {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) => (index === i ? { ...note, note: newText } : note))
    );
  }

  function remove(index: number): void {
    setNotes((prevNotes) => {
      const removedNote = prevNotes[index];
      const updatedNotes = [...prevNotes.slice(0, index), ...prevNotes.slice(index + 1)];
      return updatedNotes;
    });
  }

  function add(text: string): void {
    setNotes((prevNotes) => [...prevNotes, { id: nextId(), note: text }]);
  }


    return (
    <div className='w-1/4' >
     {notes.map((note, index) => (
  
 
    <Note key={index} index={index} onChange={update} onRemove={remove}>
      {note.note}
         </Note>
    
         
     ))}
                

          <div id="create" onClick={() => add('New Note!')} className='text-black border-black dark:text-white dark:border-white '>
       +
      </div>
    </div>
  );
};

Board.propTypes = {
  count: (props: any, propName: string) => {
    if (typeof props[propName] !== 'number') {
      return new Error('The count property must be a number');
    }
    if (props[propName] > 100) {
      return new Error(`Creating ${props[propName]} notes is ridiculous`);
    }
    return null;
  },
};

const NotesDiv: React.FC = () => {
  return (
      <>
         
          <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    My Notes
                </h4>
              
            </div>
        
      <Board count={50} />
              


    </>
  );
};

export default NotesDiv;