import { X } from 'lucide-react';
import Modal from './Modal';

const PosterModal = ({ isOpen, onClose, posterImage, posterAlt = "Special Offer" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      maxHeight="max-h-[90vh]"
      className="p-0 bg-transparent shadow-none"
    >
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-30 p-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white"
          aria-label="Close poster"
        >
          <X size={18} className="text-white font-bold stroke-[2]" />
        </button>

        {/* Clickable poster image that opens Google Form */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeDX0dtxDzX-k2FGwV1RCgxT1Qecmm4a4jKbJfI_EPYkTbfaA/viewform?embedded=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={posterImage}
            alt={posterAlt}
            className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-pointer"
            style={{ display: 'block' }}
          />
        </a>
      </div>
    </Modal>
  );
};

export default PosterModal;







// import { X } from 'lucide-react';
// import Modal from './Modal';

// const PosterModal = ({ isOpen, onClose, posterImage, posterAlt = "Special Offer" }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       maxWidth="max-w-2xl"
//       maxHeight="max-h-[90vh]"
//       className="p-0 bg-transparent shadow-none"
//     >
//       <div className="relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 z-30 p-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white"
//           aria-label="Close poster"
//         >
//           <X size={18} className="text-white font-bold stroke-[2]" />
//         </button>

//         {/* Clickable poster image that opens Google Form */}
//         <a
//           href="https://docs.google.com/forms/d/e/1FAIpQLSeDX0dtxDzX-k2FGwV1RCgxT1Qecmm4a4jKbJfI_EPYkTbfaA/viewform?embedded=true"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img
//             src={posterImage}
//             alt={posterAlt}
//             className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-pointer"
//             style={{ display: 'block' }}
//           />
//         </a>
//       </div>
//     </Modal>
//   );
// };

// export default PosterModal;







// ========================================
// FILE: src/components/modals/PosterModal.jsx
// POSTER MODAL WITH DYNAMIC LINK SUPPORT
// ========================================

// import { X } from 'lucide-react';
// import Modal from './Modal';

// const PosterModal = ({ 
//   isOpen, 
//   onClose, 
//   posterImage, 
//   posterAlt = "Special Offer",
//   posterLink = null,
//   linkTarget = "_blank"
// }) => {
//   const ImageContent = () => (
//     <img
//       src={posterImage}
//       alt={posterAlt}
//       className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-pointer"
//       style={{ display: 'block' }}
//     />
//   );

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       maxWidth="max-w-2xl"
//       maxHeight="max-h-[90vh]"
//       className="p-0 bg-transparent shadow-none"
//     >
//       <div className="relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 z-30 p-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white"
//           aria-label="Close poster"
//         >
//           <X size={18} className="text-white font-bold stroke-[2]" />
//         </button>

//         {/* Conditional wrapper: link if posterLink exists, div otherwise */}
//         {posterLink ? (
//           <a
//             href={posterLink}
//             target={linkTarget}
//             rel="noopener noreferrer"
//           >
//             <ImageContent />
//           </a>
//         ) : (
//           <div>
//             <ImageContent />
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default PosterModal;






// import { X } from 'lucide-react';
// import Modal from './Modal';

// const PosterModal = ({ 
//   isOpen, 
//   onClose, 
//   posterImage, 
//   posterAlt = "Special Offer",
//   posterLink = null,
//   linkTarget = "_blank",
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       maxWidth="max-w-3xl"
//       maxHeight="max-h-[90vh]"
//       className="p-0 bg-transparent shadow-none"
//       closeOnOverlayClick={true}
//       closeOnEsc={true}
//     >
//       <div className="relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 z-30 p-2 bg-gray-800/80 hover:bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white/50"
//           aria-label="Close poster"
//         >
//           <X size={20} className="text-white font-bold stroke-[2.5]" />
//         </button>

//         {/* Poster Image */}
//         {posterLink ? (
//           <a
//             href={posterLink}
//             target={linkTarget}
//             rel="noopener noreferrer"
//             className="block"
//           >
//             <img
//               src={posterImage}
//               alt={posterAlt}
//               className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
//             />
//           </a>
//         ) : (
//           <img
//             src={posterImage}
//             alt={posterAlt}
//             className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//           />
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default PosterModal;