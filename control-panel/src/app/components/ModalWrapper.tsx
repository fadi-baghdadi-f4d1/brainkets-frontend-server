"use client";
import React from 'react';
import { useModalContext } from '@/context/ModalContext';

const ModalWrapper: React.FC = () => {
  const { renderModals } = useModalContext();

  return <>{renderModals()}</>;
};

export default ModalWrapper;
