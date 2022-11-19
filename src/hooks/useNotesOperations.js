// This file contains all the Playlist operations
import { useAuth, useData } from "contexts";
import {
  getNotesFromServer,
  addNewNoteInServer,
  deleteNoteFromServer,
  updateNoteInServer,
} from "services";
import { useVideoOperations } from "./useVideoOperations";

function useNotesOperations() {
  const { authToken } = useAuth();
  const { dispatch } = useData();

  const { resetFunction } = useVideoOperations();

  const getNotes = async () => {
    try {
      const response = await getNotesFromServer(authToken);
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.notes },
      });
    } catch (e) {
      resetFunction();
    }
  };

  const addNewNote = async (note, setDisable) => {
    setDisable(true);
    try {
      const response = await addNewNoteInServer(authToken, note);
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.notes },
      });
      return response.data;
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const deleteNote = async (noteId, setDisable) => {
    setDisable(true);
    try {
      const response = await deleteNoteFromServer(authToken, noteId);
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.notes },
      });
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
  };

  const updateNote = async (note, setDisable) => {
    setDisable(true);
    try {
      const response = await updateNoteInServer(authToken, note);
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.notes },
      });
      return response.data;
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
  };
  return {
    getNotes,
    addNewNote,
    deleteNote,
    updateNote,
  };
}

export { useNotesOperations };
