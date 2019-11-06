import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
export default function InputModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <React.Fragment>
      <button onClick={handleOpen}>open</button>
      <ReactModal isOpen={isOpen}>
        <button onClick={handleClose}>close</button>
      </ReactModal>
    </React.Fragment>
  );
}
