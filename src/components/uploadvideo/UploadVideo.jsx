import React, { useState } from "react";
import { CommonVideoCard, Sidebar } from "components";
import { useData } from "contexts";
import { UploadVideoModal } from "./UploadVideoModal";

function UploadVideo() {
  const { state } = useData();
  const [uploadModal, setUploadModal] = useState(false);
  return (
    <div className="middle-content">
      <Sidebar />
      <div className="flex-column">
        <div className="flex-row-justify-space-between">
          <div className="flex-column-start">
            <div className="large-font-size">Uploaded Videos</div>
            <div>{`${state.uploadedVideos.length} video(s)`}</div>
          </div>

          <button
            className="btn btn-fit-content btn-primary"
            onClick={() => setUploadModal(true)}
          >
            Upload Video
          </button>
        </div>

        <div className="flex-row-center">
          <div className="videos-container">
            {state.uploadedVideos.map((video) => (
              <CommonVideoCard
                video={video}
                playlistCategory={video.category}
                uploaded={true}
                key={video._id}
              ></CommonVideoCard>
            ))}
          </div>
        </div>
      </div>
      {state.uploadedVideos.length === 0 && (
        <div className="flex-column-center margin-container no-playlist-container">
          <div>No videos uploaded.</div>
        </div>
      )}

      {uploadModal && (
        <UploadVideoModal
          uploadModal={uploadModal}
          setUploadModal={setUploadModal}
        />
      )}
    </div>
  );
}

export { UploadVideo };
