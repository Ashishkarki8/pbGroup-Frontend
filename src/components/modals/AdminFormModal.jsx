// // ========================================
// // FILE: src/components/modals/AdminFormModal.jsx
// // ADMIN CREATION/EDIT MODAL
// // ========================================

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { UserPlus, User, Mail, LockKeyhole, Eye, EyeOff, X } from 'lucide-react';
// import Modal from './Modal';

// const adminSchema = z.object({
//   username: z
//     .string()
//     .min(3, 'Username must be at least 3 characters')
//     .max(30, 'Username cannot exceed 30 characters')
//     .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores allowed'),
//   email: z.string().email('Invalid email address'),
//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(128, 'Password cannot exceed 128 characters'),
//   role: z.enum(['admin', 'super_admin']),
// });

// const AdminFormModal = ({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   isSubmitting = false,
//   mode = 'create', // 'create' or 'edit'
//   initialData = null 
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//   } = useForm({
//     resolver: zodResolver(adminSchema),
//     mode: 'onChange',
//     defaultValues: initialData || {
//       username: '',
//       email: '',
//       password: '',
//       role: 'admin',
//     },
//   });

//   const handleFormSubmit = (data) => {
//     onSubmit({
//       ...data,
//       username: data.username.toLowerCase().trim(),
//     });
//   };

//   // Reset form when modal closes or initialData changes
//   useEffect(() => {
//     if (!isOpen) {
//       reset();
//       setShowPassword(false);
//     } else if (initialData) {
//       reset(initialData);
//     }
//   }, [isOpen, initialData, reset]);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       maxWidth="max-w-lg"
//       className="p-0"
//     >
//       <div className="relative p-8">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
//           aria-label="Close form"
//         >
//           <X className="w-5 h-5 text-gray-500" />
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//             <UserPlus className="w-8 h-8 text-blue-600" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">
//             {mode === 'create' ? 'Create New Admin' : 'Edit Admin'}
//           </h2>
//           <p className="text-gray-600 mt-2">
//             {mode === 'create' 
//               ? 'Add a new administrator to the system' 
//               : 'Update administrator details'}
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//           {/* Username Field */}
//           <div>
//             <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="admin-username"
//                 type="text"
//                 {...register('username')}
//                 className={`block w-full pl-10 pr-3 py-3 border ${
//                   errors.username ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 placeholder="admin_user"
//               />
//             </div>
//             {errors.username && (
//               <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="admin-email"
//                 type="email"
//                 {...register('email')}
//                 className={`block w-full pl-10 pr-3 py-3 border ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 placeholder="admin@example.com"
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <LockKeyhole className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="admin-password"
//                 type={showPassword ? 'text' : 'password'}
//                 {...register('password')}
//                 className={`block w-full pl-10 pr-10 py-3 border ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Role Field */}
//           <div>
//             <label htmlFor="admin-role" className="block text-sm font-medium text-gray-700 mb-2">
//               Role
//             </label>
//             <select
//               id="admin-role"
//               {...register('role')}
//               className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="admin">Admin</option>
//               <option value="super_admin">Super Admin</option>
//             </select>
//             {errors.role && (
//               <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={!isValid || isSubmitting}
//             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 {mode === 'create' ? 'Creating...' : 'Updating...'}
//               </>
//             ) : (
//               mode === 'create' ? 'Create Admin' : 'Update Admin'
//             )}
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default AdminFormModal;


// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Example 1: Using PosterModal with link
import { useState } from 'react';
import PosterModal from './components/modals/PosterModal';

function App() {
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsPosterOpen(true)}>
        Show Poster
      </button>

      <PosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
        posterImage="/path/to/poster.jpg"
        posterAlt="Special Offer"
        posterLink="https://docs.google.com/forms/..."
      />
    </>
  );
}

// Example 2: Using LoginModal
import { useState } from 'react';
import LoginModal from './components/modals/LoginModal';

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsLoginOpen(true)}>
        Admin Login
      </button>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          console.log('Login successful!');
          // Handle post-login actions
        }}
      />
    </>
  );
}

// Example 3: Using AdminFormModal
import { useState } from 'react';
import AdminFormModal from './components/modals/AdminFormModal';

function AdminDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAdmin = async (data) => {
    setIsSubmitting(true);
    try {
      // API call to create admin
      await createAdminAPI(data);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsFormOpen(true)}>
        Create New Admin
      </button>

      <AdminFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAdmin}
        isSubmitting={isSubmitting}
        mode="create"
      />
    </>
  );
}
*/





import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
import Modal from './Modal';

const adminSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
  role: z.enum(['admin', 'super_admin'], {
    required_error: 'Please select a role',
  }),
});

const AdminFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false,
  mode = 'create',
  initialData = null
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: zodResolver(adminSchema),
    mode: 'onChange',
    defaultValues: initialData || {
      username: '',
      email: '',
      password: '',
      role: 'admin',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-lg"
      className="p-0"
      closeOnOverlayClick={false}
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {mode === 'create' ? (
              <UserPlus className="w-6 h-6 text-blue-600" />
            ) : (
              <Shield className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Create New Admin' : 'Edit Admin'}
            </h2>
            <p className="text-sm text-gray-600">
              {mode === 'create' ? 'Add a new administrator to the system' : 'Update administrator details'}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close form"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5">
        <div>
          <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-username"
            type="text"
            {...register('username')}
            className={`w-full px-4 py-3 border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="admin_user"
            disabled={mode === 'edit'}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="admin@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full px-4 py-3 pr-10 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder={mode === 'edit' ? 'Leave blank to keep current' : '••••••••'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="admin-role" className="block text-sm font-medium text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="admin-role"
            {...register('role')}
            className={`w-full px-4 py-3 border ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Super Admins have full access to all system features
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {mode === 'create' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              <>{mode === 'create' ? 'Create Admin' : 'Update Admin'}</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminFormModal;