import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth, useData } from "contexts";
import { useNotesOperations } from "hooks";

function EditNote({ videoRef, editMode, setEditMode, note }) {
  const { currentVideo } = useData();
  const { addNewNote, updateNote } = useNotesOperations();
  const { authToken } = useAuth();
  const [noteTitle, setNoteTitle] = useState(() =>
    editMode ? note.title : ""
  );
  const [noteDescription, setNoteDescription] = useState(() =>
    editMode ? note.description : ""
  );
  const [disableSave, setDisableSave] = useState(false);

  const addNoteHandler = (e) => {
    e.preventDefault();
    if (authToken) {
      if (noteTitle.trim().length > 0 && noteDescription.trim().length > 0)
        addNewNote(
          {
            title: noteTitle,
            description: noteDescription,
            playingTime: videoRef.current.getCurrentTime(),
            videoId: currentVideo._id,
          },
          setDisableSave
        );
      setNoteDescription("");
      setNoteTitle("");
    } else toast.info("Please login to add Note!");
  };

  const updateNoteHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim().length > 0 && noteDescription.trim().length > 0) {
      updateNote(
        {
          ...note,
          title: noteTitle,
          description: noteDescription,
        },
        setDisableSave
      );
    }
    setEditMode(false);
  };

  const onDiscardHandler = () => {
    if (editMode) setEditMode(false);
    else {
      setNoteTitle("");
      setNoteDescription("");
    }
  };
  return (
    <form
      onSubmit={(e) => (editMode ? updateNoteHandler(e) : addNoteHandler(e))}
    >
      <div>
        <input
          placeholder="Title.."
          className="input-primary input-full-width"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Description.."
          className="input-primary input-full-width input-height-6"
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
      </div>
      <div className="flex-row-justify-start add-note-btns">
        <button
          type="submit"
          className="btn btn-primary btn-fit-content"
          disabled={disableSave}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-primary btn-fit-content"
          onClick={onDiscardHandler}
        >
          Discard
        </button>
      </div>
    </form>
  );
}

export { EditNote };
