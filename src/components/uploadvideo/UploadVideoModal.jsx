import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUploadVideoHandler } from "hooks";
import React, { useState } from "react";
import "./uploadvideo.css";
function UploadVideoModal({ uploadModal, setUploadModal }) {
  const {
    uploadData,
    uploadDispatch,
    uploadErrorData,
    uploadErrorDispatch,
    uploadVideoHandler,
  } = useUploadVideoHandler();
  return (
    <div
      className={`modal-wrapper ${
        uploadModal ? "display-block" : "display-none"
      }`}
    >
      <div className="playlist-modal upload-modal">
        <div className="position-relative flex-column-center">
          <h5>UPLOAD VIDEO</h5>
          <form className="">
            <div className="form-input ">
              {" "}
              <label
                htmlFor="videoUrl"
                className="input-label small-font-size input-upload-label"
              >
                Youtube Video URL *
              </label>
              <input
                type="text"
                placeholder="Enter Youtube Video URL"
                className="input-primary input-upload border-box"
                id="videoUrl"
                value={uploadData.videoUrl}
                onChange={(e) =>
                  uploadDispatch({
                    type: "VIDEO_URL",
                    payload: e.target.value,
                  })
                }
                onFocus={() =>
                  uploadErrorDispatch({
                    type: "ERROR_VIDEO_URL",
                    payload: "",
                  })
                }
                required
              />
            </div>
            {uploadErrorData.videoUrl.length > 0 && (
              <div className="error upload-error">
                <FontAwesomeIcon
                  icon="circle-exclamation"
                  className="error-icon"
                />
                {"    "}
                <div> {uploadErrorData.videoUrl}</div>
              </div>
            )}
            <div className="form-input ">
              {" "}
              <label
                htmlFor="title"
                className="input-label small-font-size input-upload-label"
              >
                Enter Title *
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                className="input-primary input-upload border-box"
                id="title"
                value={uploadData.title}
                onChange={(e) =>
                  uploadDispatch({
                    type: "VIDEO_TITLE",
                    payload: e.target.value,
                  })
                }
                onFocus={() =>
                  uploadErrorDispatch({
                    type: "ERROR_VIDEO_TITLE",
                    payload: "",
                  })
                }
                required
              />
            </div>
            {uploadErrorData.title.length > 0 && (
              <div className="error upload-error">
                <FontAwesomeIcon
                  icon="circle-exclamation"
                  className="error-icon"
                />
                {"    "}
                <div> {uploadErrorData.title}</div>
              </div>
            )}
            <div className="form-input">
              <label
                htmlFor="category"
                className="input-label small-font-size input-upload-label"
              >
                Select Category *
              </label>
              <select
                className="input-primary input-upload border-box "
                type="select"
                id="category"
                value={uploadData.category}
                onChange={(e) =>
                  uploadDispatch({
                    type: "VIDEO_CATEGORY",
                    payload: e.target.value,
                  })
                }
              >
                <option value="Cakes">Cakes</option>
                <option value="Muffins">Muffins</option>
                <option value="Cookies">Cookies</option>
                <option value="Pastries">Pastries</option>
                <option value="Donuts">Donuts</option>
              </select>
            </div>
            <div className="form-input ">
              {" "}
              <label
                htmlFor="description"
                className="input-label small-font-size input-upload-label"
              >
                Enter Description *
              </label>
              <textarea
                type="text"
                placeholder="Enter Description"
                className="input-primary input-upload border-box input-height-6"
                id="description"
                value={uploadData.description}
                onChange={(e) =>
                  uploadDispatch({
                    type: "VIDEO_DESCRIPTION",
                    payload: e.target.value,
                  })
                }
                onFocus={() =>
                  uploadErrorDispatch({
                    type: "ERROR_VIDEO_DESCRIPTION",
                    payload: "",
                  })
                }
                required
              />
            </div>
            {uploadErrorData.description.length > 0 && (
              <div className="error upload-error">
                <FontAwesomeIcon
                  icon="circle-exclamation"
                  className="error-icon"
                />
                {"    "}
                <div> {uploadErrorData.description}</div>
              </div>
            )}
            <div className="small-font-size upload-note">
              Note: Video once uploaded, cannot be deleted, and will be visible
              to all users of Bakin Zone.
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-auth"
              onClick={(e) => {
                uploadVideoHandler(e, setUploadModal);
              }}
            >
              UPLOAD VIDEO
            </button>
          </form>
          <FontAwesomeIcon
            icon="close"
            className="close-btn upload-close-btn"
            onClick={() => {
              setUploadModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { UploadVideoModal };
