import { useState, useRef } from 'react';
import { X, Upload, Eye, EyeOff } from 'lucide-react';
import Modal from './Modal';

const PosterFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    image: null,
    link: '',
    altText: 'Poster',
    isActive: true,
  });
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when modal opens/closes or initialData changes
  useState(() => {
    if (isOpen) {
      setFormData({
        image: null,
        link: initialData?.link || '',
        altText: initialData?.altText || 'Poster',
        isActive: initialData?.isActive ?? true,
      });
      setPreviewUrl(initialData?.imageUrl || null);
      setShowPreview(false);
    }
  }, [isOpen, initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image && !initialData) {
      alert('Please select an image');
      return;
    }

    const submitData = new FormData();
    if (formData.image) submitData.append('image', formData.image);
    if (formData.link) submitData.append('link', formData.link);
    submitData.append('altText', formData.altText);
    submitData.append('isActive', formData.isActive);

    onSubmit(submitData);
  };

  const handleClose = () => {
    setFormData({
      image: null,
      link: '',
      altText: 'Poster',
      isActive: true,
    });
    setPreviewUrl(null);
    setShowPreview(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-md"
      title={initialData ? 'Edit Poster' : 'Add New Poster'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poster Image *
          </label>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <Upload size={20} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {formData.image ? formData.image.name : 'Choose image file'}
              </span>
            </button>

            {/* Preview */}
            {previewUrl && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Preview:</span>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showPreview ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showPreview && (
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link (optional)
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty if no link is needed
          </p>
        </div>

        {/* Alt Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text
          </label>
          <input
            type="text"
            value={formData.altText}
            onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
            placeholder="Describe the poster"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
            Active (visible to users)
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PosterFormModal;