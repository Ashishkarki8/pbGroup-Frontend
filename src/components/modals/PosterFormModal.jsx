import { useState, useRef, useEffect } from 'react';
import { Upload, Eye, EyeOff, Link as LinkIcon } from 'lucide-react';
import Modal from './Modal';

const PosterFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    image: null,
    link: '',
    altText: 'Poster',
    isActive: true,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        image: null,
        link: initialData?.link || '',
        altText: initialData?.altText || 'Poster',
        isActive: initialData?.isActive ?? true,
      });
      setPreviewUrl(initialData?.imageUrl || null);
      setShowPreview(!!initialData?.imageUrl);
      setIsSubmitting(false);
    }
  }, [isOpen, initialData]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && !initialData?.imageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      e.target.value = '';
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      e.target.value = '';
      return;
    }

    // Revoke old preview URL
    if (previewUrl && !initialData?.imageUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFormData(prev => ({ ...prev, image: file }));
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    // Validation
    if (!formData.image && !initialData) {
      alert('Please select an image');
      return;
    }

    if (!formData.altText.trim()) {
      alert('Please provide alt text for accessibility');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      if (formData.image) submitData.append('image', formData.image);
      if (formData.link.trim()) submitData.append('link', formData.link.trim());
      submitData.append('altText', formData.altText.trim());
      submitData.append('isActive', formData.isActive);

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    // Cleanup
    if (previewUrl && !initialData?.imageUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFormData({
      image: null,
      link: '',
      altText: 'Poster',
      isActive: true,
    });
    setPreviewUrl(null);
    setShowPreview(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-2xl"
      title={initialData ? 'Edit Poster' : 'Add New Poster'}
    >
      <div className="px-6 py-2">
        <div className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Poster Image <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white"
              >
                <Upload size={20} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600">
                  {formData.image ? formData.image.name : initialData ? 'Change image file' : 'Choose image file'}
                </span>
              </button>

              {/* Preview */}
              {previewUrl && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Preview:</span>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      disabled={isSubmitting}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showPreview ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showPreview && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
              <LinkIcon size={16} className="inline mr-1 mb-0.5" />
              Link (optional)
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              disabled={isSubmitting}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Users will be redirected here when clicking the poster
            </p>
          </div>

          {/* Alt Text */}
          <div>
            <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="altText"
              value={formData.altText}
              onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Describe the poster for accessibility"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Brief description for screen readers and SEO
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              disabled={isSubmitting}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
              Active (visible to users)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>{initialData ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{initialData ? 'Update Poster' : 'Create Poster'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PosterFormModal;