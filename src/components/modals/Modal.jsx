


import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children,
  maxWidth = "max-w-5xl",
  maxHeight = "max-h-[95vh]",
  width = "w-full",
  className = ""
}) => {
  // Close on ESC key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ADD THIS - Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className={`
        relative bg-white rounded-2xl shadow-2xl overflow-hidden z-20
        ${width} ${maxWidth} ${maxHeight} ${className}
      `}>
        {children}
      </div>
    </div>
  );
};

export default Modal; 



/* import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children,
  maxWidth = "max-w-5xl",
  maxHeight = "max-h-[95vh]",
  width = "w-full",
  className = "",
  closeOnBackdropClick = true,
  showCloseButton = false
}) => {
  // Close on ESC key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={closeOnBackdropClick ? onClose : undefined}
      ></div>
      <div className={`
        relative bg-white rounded-2xl shadow-2xl overflow-hidden z-20
        ${width} ${maxWidth} ${maxHeight} ${className}
      `}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg transition-all"
            aria-label="Close"
          >
            <X size={18} className="text-white" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;







// import React from 'react';

// const Modal = ({ 
//   isOpen, 
//   onClose, 
//   children,
//   maxWidth = "max-w-5xl",
//   maxHeight = "max-h-[95vh]",
//   width = "w-full",
//   className = "",
//   closeOnBackdrop = true,
//   closeOnEsc = true,
//   showBackdrop = true,
//   backdropBlur = "backdrop-blur-md"
// }) => {
//   // Close on ESC key
//   React.useEffect(() => {
//     if (!closeOnEsc) return;
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose, closeOnEsc]);

//   // Prevent body scroll when modal is open
//   React.useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center h-screen p-4 md:p-8">
//       {/* Backdrop */
//       {showBackdrop && (
//         <div
//           className={`absolute inset-0 bg-black/40 ${backdropBlur}`}
//           onClick={closeOnBackdrop ? onClose : undefined}
//         ></div>
//       )}
      
//       {/* Modal Content */}
//       <div className={`
//         relative bg-white rounded-2xl shadow-2xl overflow-hidden z-20
//         ${width} ${maxWidth} ${maxHeight} ${className}
//       `}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;






// ========================================
// BASE MODAL COMPONENT (Reusable)
// components/modals/Modal.jsx
// ========================================

// import { useEffect } from 'react';

// const Modal = ({ 
//   isOpen, 
//   onClose, 
//   children,
//   maxWidth = "max-w-5xl",
//   maxHeight = "max-h-[95vh]",
//   width = "w-full",
//   className = "",
//   showOverlay = true,
//   overlayClassName = "bg-black/40 backdrop-blur-md",
//   closeOnOverlayClick = true,
//   closeOnEsc = true,
// }) => {
//   // Close on ESC key
//   useEffect(() => {
//     if (!closeOnEsc || !isOpen) return;
    
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose, closeOnEsc, isOpen]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
//       role="dialog"
//       aria-modal="true"
//     >
//       {/* Overlay */}
//       {showOverlay && (
//         <div
//           className={`absolute inset-0 ${overlayClassName}`}
//           onClick={closeOnOverlayClick ? onClose : undefined}
//           aria-hidden="true"
//         />
//       )}
      
//       {/* Modal Content */}
//       <div 
//         className={`
//           relative bg-white rounded-2xl shadow-2xl overflow-hidden z-20
//           ${width} ${maxWidth} ${maxHeight} ${className}
//         `}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;