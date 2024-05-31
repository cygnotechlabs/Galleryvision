type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

const PaymentModal: React.FC<Props> = ({ onClose, onConfirm }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold px-3 py-3 mb-4">Confirm Payment</h2>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
