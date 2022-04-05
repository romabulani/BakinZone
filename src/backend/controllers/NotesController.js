import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to User Notes are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles adding note to user's notes.
 * send POST Request at /api/user/notes
 * */

export const addNewNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { note } = JSON.parse(request.requestBody);
    user.notes.push({ ...note, _id: uuid() });
    return new Response(201, {}, { notes: user.notes });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};

/**
 * This handler handles removing note from user's notes.
 * send DELETE Request at /api/user/notes/:noteId
 * */

export const deleteNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const noteId = request.params.noteId;
    const filteredNotes = user.notes.filter((item) => item._id !== noteId);
    this.db.users.update({ notes: filteredNotes });
    return new Response(200, {}, { notes: filteredNotes });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles getting notes from  video.
 * send GET Request at /api/user/notes/:videoId
 * */

export const getNotesForVideoHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const note = user.notes.find((item) => item._id !== videoId);
    return new Response(200, {}, { note });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles editing notes.
 * send POST Request at /api/user/notes/:noteId
 * */

export const updateNoteHandler = function (schema, request) {
  const noteId = request.params.noteId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const noteIndex = user.notes.findIndex((note) => note._id === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };

    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
