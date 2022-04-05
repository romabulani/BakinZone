import axios from "axios";
import { toast } from "react-toastify";

const getNotesForVideoFromServer = async (authorization, videoId) => {
  try {
    const response = await axios.get(`/api/user/notes/${videoId}`, {
      headers: { authorization },
    });
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.error(
      "getNotesForVideoFromServer : Error in fetching notes for the video",
      e
    );
  }
};

const addNewNoteInServer = async (authorization, note) => {
  try {
    const response = await axios.post(
      "/api/user/notes",
      { note },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) {
      toast.success("Note added!");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't add Note! Try again.`);
    console.error("addNewNoteInServer : Error in adding note", e);
  }
};

const deleteNoteFromServer = async (authorization, noteId) => {
  try {
    const response = await axios.delete(`/api/user/notes/${noteId}`, {
      headers: { authorization },
    });
    if (response.status === 200) {
      toast.success("Note deleted");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't delete note! Try again.`);
    console.error("deleteNoteFromServer : Error in deleting note", e);
  }
};

const updateNoteInServer = async (authorization, note) => {
  try {
    const response = await axios.delete(
      `/api/user/notes/${note._id}`,
      { note },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) {
      toast.success("Note Updated");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't update note! Try again.`);
    console.error("updateNoteInServer : Error in updating note", e);
  }
};

export {
  addNewNoteInServer,
  getNotesForVideoFromServer,
  deleteNoteFromServer,
  updateNoteInServer,
};
