import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
