// "use client";
// import React from 'react';
// import { useModalContext } from './ModalContext';
//
// const ModalWrapper: React.FC = () => {
//     const { isModalOpen, toggleModal } = useModalContext();
//
//     return (
//         <>
//             {isModalOpen && (
//                 <div className="modal">
//                     {/* Replace this with the actual modal component you want to render */}
//                     <div className="modal-content">
//                         <p>This is a modal</p>
//                         <button onClick={toggleModal}>Close Modal</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default ModalWrapper;
"use client";
import React from 'react';
import { useModalContext } from '@/context/ModalContext';

const ModalWrapper: React.FC = () => {
    const { renderModals } = useModalContext();

    return <>{renderModals()}</>;
};

export default ModalWrapper;
