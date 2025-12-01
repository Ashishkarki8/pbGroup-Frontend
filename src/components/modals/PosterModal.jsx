// import { X } from 'lucide-react';
// import Modal from './Modal';

// const PosterModal = ({ isOpen, onClose, posterLink, posterImage,posterAlt}) => {
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

       
//         <a
//           href={posterLink}
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




import { X } from 'lucide-react';
import Modal from './Modal';

const PosterModal = ({ 
  isOpen, 
  onClose, 
  posterLink, 
  posterImage, 
  posterAlt = "Special Offer" 
}) => {
  // Check if link is valid
  const hasValidLink = posterLink && posterLink !== '#' && posterLink.trim() !== '';

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

        {/* Conditional rendering: with link or without */}
        {hasValidLink ? (
          <a
            href={posterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={posterImage}
              alt={posterAlt}
              className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
              style={{ display: 'block' }}
              loading="eager"
              fetchpriority="high"
            />
          </a>
        ) : (
          <img
            src={posterImage}
            alt={posterAlt}
            className="w-full h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            style={{ display: 'block' }}
            loading="eager"
            fetchpriority="high"
          />
        )}
      </div>
    </Modal>
  );
};

export default PosterModal;