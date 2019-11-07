import React, { useState } from 'react';
import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: '#808080',
    zIndex: 2
  },
  content: {
    height: '140px',
    zIndex: 3
  }
};
ReactModal.setAppElement('#root');
export default function InputModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <React.Fragment>
      <button onClick={handleOpen}>open</button>
      <ReactModal isOpen={isOpen} style={modalStyle}>
        <button onClick={handleClose}>close</button>
      </ReactModal>
    </React.Fragment>
  );
}
