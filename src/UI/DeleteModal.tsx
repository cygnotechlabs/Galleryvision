type Props = {
  onClose: () => void;
  handleDelete: () => void;
};

export const DeleteModal = ({ onClose, handleDelete }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="text-gray-600 mb-4 px-3 py-3 font-semibold">
        Are you sure you want to delete this item?
      </p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleDelete();
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" // Handle the delete action
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const DeleteModalLicensor = ({ onClose, handleDelete }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="text-gray-600 mb-4 px-3 py-3 font-semibold">
        Are you sure you want to delete this item? Deleting a Licensor will also
        delete All Channels and Music Partner
      </p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleDelete();
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" // Handle the delete action
        >
          Delete
        </button>
      </div>
    </div>
  );
};
