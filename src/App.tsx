import { useState } from "react";
import "./App.css";
import Notiz from "./components/Notiz";
import Input from "./components/Input";

function App() {
  const [notes, setNotes] = useState<{ title: string; description: string }[]>(
    () => {
      const savedNotizen = localStorage.getItem("notizen");
      return savedNotizen ? JSON.parse(savedNotizen) : [];
    }
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>();

  /**
   *  Change Title and Description
   * @param event  - Event
   * @param title  - boolean
   */
  const changeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: boolean
  ) => {
    title ? setTitle(event.target.value) : setDescription(event.target.value);
  };

  /**
   * Add Note
   */
  const addNote = () => {
    setNotes([...notes, { title: title, description: description }]);
    setTitle("");
    setDescription("");
    localStorage.setItem(
      "notizen",
      JSON.stringify([...notes, { title: title, description: description }])
    );
  };

  /**
   * Delete Note
   * @param index - number
   */
  const deleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    localStorage.setItem("notizen", JSON.stringify(newNotes));
  };

  /**
   * select Note to Edit
   * @param index - number
   */
  const editNote = (index: number) => {
    const editNote = notes.find((_, i) => i === index);
    setTitle(editNote?.title || "");
    setDescription(editNote?.description || "");
    setEditIndex(index);
  };

  /**
   * save edited Note
   */
  const editNoteSave = () => {
    const newNotes = notes.map((element, i) => {
      if (i === editIndex) {
        return { title: title, description: description };
      }
      return element;
    });
    setNotes(newNotes);
    setTitle("");
    setDescription("");
    setEditIndex(undefined);
    localStorage.setItem("notizen", JSON.stringify(newNotes));
  };

  return (
    <div>
      <h1>Notizen</h1>
      <div>
        <Input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeTitle(event, true)
          }
        />
        <Input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeTitle(event, false)
          }
        />
        {editIndex !== undefined && notes.length > 0 ? (
          <button onClick={editNoteSave}>Speichern</button>
        ) : (
          <button onClick={addNote}>Notiz hinzufügen</button>
        )}
      </div>
      {notes.length === 0 ? (
        <p>Keine Notizen vorhanden</p>
      ) : (
        <ul>
          {notes.map((element, i) => (
            <Notiz
              key={i}
              title={element.title}
              description={element.description}
              onDelete={() => deleteNote(i)}
              onEdit={() => {
                editNote(i);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
