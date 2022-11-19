import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotesOperations } from "hooks";
import { EditNote } from "./EditNote";

function SingleNote({ note }) {
  const { deleteNote } = useNotesOperations();
  const [editMode, setEditMode] = useState(false);
  const [disable, setDisable] = useState(false);

  const getTime = () => {
    const totalSeconds = note.playingTime;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds - minutes * 60);
    return `${minutes} : ${seconds}`;
  };

  return (
    <>
      {!editMode && (
        <div className="added-note">
          <p className="added-note-header">{note.title}</p>
          <p className="added-note-description">{note.description}</p>
          <p>
            <FontAwesomeIcon icon="clock" className="p-right-5" />
            <span>{getTime()}</span>
          </p>
          <div className="flex-row-justify-start">
            <button
              onClick={() => setEditMode(true)}
              disabled={disable}
              className="btn-no-decoration text-white"
            >
              <FontAwesomeIcon icon="pen" />
            </button>
            <button
              onClick={() => deleteNote(note._id, setDisable)}
              disabled={disable}
              className="btn-no-decoration error-color"
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </div>
        </div>
      )}
      {editMode && (
        <EditNote editMode={editMode} setEditMode={setEditMode} note={note} />
      )}
    </>
  );
}

export { SingleNote };
