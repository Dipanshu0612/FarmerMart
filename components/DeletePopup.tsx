/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const DeletePopup = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;
  const handleConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
    onClose();
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handlePopupClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
      <div
        className="bg-white rounded-lg p-6 w-96 shadow-xl"
        onClick={handlePopupClick}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-left">Delete Image</h2>
          <p className="text-gray-600 text-left">
            Are you sure you want to delete this image?
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
