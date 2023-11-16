"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import "./Modals.css";
type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  message: string;
};
// type Props = {
//   // open: () => void;
//   opened: boolean;
//   close: () => void;
// };
// type Props = {
//   message: string;
//   setMessage: Dispatch<SetStateAction<string>>;
// };

// export default function ErrorModal({ message, setMessage }: Props) {
//   function handleClick() {
//     setMessage("");
//   }

//   function closeModal(e: React.MouseEvent<HTMLDivElement | MouseEvent>) {
//     const target = e.target as HTMLDivElement;

//     if (
//       !target.classList.contains("modal-card") &&
//       !target.classList.contains("modal-card-header") &&
//       !target.classList.contains("modal-card-icon") &&
//       !target.classList.contains("modal-card-subtitle")
//     ) {
//       return setMessage("");
//     } else {
//       return setMessage(message);
//     }
//   }

//   return (
//     <div className="modal-container" onClick={closeModal}>
//       <div className="modal-card">
//         <h2 className="modal-card-header">Error Message</h2>
//         <i className="bx bxs-error-alt modal-card-icon" />
//         <p className="modal-card-subtitle">{message}</p>
//         <button onClick={handleClick}>RETRY</button>
//       </div>
//     </div>
//   );
// }

// import { useDisclosure } from "@mantine/hooks";
// import { Modal, Button } from "@mantine/core";

// export default function ErrorModal({close, opened}: Props) {

//   return (
//     <>
//       <Modal.Root opened={opened} onClose={close}>
//         <Modal.Overlay />
//         <Modal.Content>
//           <Modal.Header>
//             <Modal.Title>Modal title</Modal.Title>
//             <Modal.CloseButton />
//           </Modal.Header>
//           <Modal.Body>Modal content</Modal.Body>
//         </Modal.Content>
//       </Modal.Root>
//     </>
//   );
// }

import { Modal } from "antd";
import { Context } from "@/contexts";

const ErrorModal = () => {
  const {handleOk, handleCancel, isModalOpen, errorMessage} = useContext(Context);
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="modal-card">
        <h2 className="modal-card-header">Error Message</h2>
        <i className="bx bxs-error-alt modal-card-icon" />
        <p className="modal-card-subtitle">{errorMessage}</p>
        <button onClick={handleCancel}>RETRY</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
