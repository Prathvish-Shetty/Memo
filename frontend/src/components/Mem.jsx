import { useState } from "react";
import Alert from "./Alert";

function Mem({ mem, onEdit, onDelete }) {
  const [showAlert, setShowAlert] = useState(false);
  // Function to copy the mem link
  const handleShare = () => {
    const memLink = `${window.location.origin}/mem/${mem.shareableLink}`;
    navigator.clipboard.writeText(memLink)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="card bg-base-200 shadow-md p-4 flex flex-col gap-3 w-64 md:w-80 lg:w-96 sm:w-72 xs:w-64">
      <h3 className="text-lg font-bold">{mem.title}</h3>
      <p className="h-36 overflow-y-auto">{mem.content}</p>
      <div className="flex justify-center items-center">
        <div className="flex justify-around gap-4 flex-wrap">
          <button className="btn btn-md btn-soft text-blue-400" onClick={onEdit}>
            Update
          </button>
          <button className="btn btn-md btn-soft text-red-400" onClick={() => onDelete(mem._id)}>
            Delete
          </button>
          {mem.isPublic && <button className="btn btn-md btn-soft text-green-400" onClick={handleShare}>
            Share
          </button>}
        </div>
      </div>
      {showAlert && <Alert text="Copied to clipboard" />}
    </div>
  );
}

export default Mem;
