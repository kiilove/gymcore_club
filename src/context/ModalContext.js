"use client";

import { createContext, useState, useCallback } from "react";
import Modal from "../components/Shared/Modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const showModal = useCallback((modalConfig) => {
    setModal(modalConfig);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modal && <Modal modal={modal} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};
