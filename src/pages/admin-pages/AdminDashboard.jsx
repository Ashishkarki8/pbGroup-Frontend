import { useState } from 'react';
import { Activity, Shield, User as UserIcon, Plus, Image, ExternalLink, Edit, Trash2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useAdminStats, usePosterList, usePosterManagement } from '../../hooks/useAdmin';
import { ROLES } from '../../utils/constants';
import PosterFormModal from '../../components/modals/PosterFormModal';

const StatCard = ({ title, value, description, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold text-gray-900 mt-2">{value}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, isLoadingProfile } = useAuth();
  const isSuperAdmin = user?.role === ROLES.SUPER_ADMIN;
  const { data: statsData, isLoading: isLoadingStats } = useAdminStats({
    enabled: isSuperAdmin,
  });

  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  // API hooks
  const { data: posterData, isLoading: isLoadingPosters } = usePosterList();
  const { createPoster, updatePoster, deletePoster } = usePosterManagement();

  const posters = posterData?.posters || [];

  const handleCreatePoster = (formData) => {
    createPoster(formData, {
      onSuccess: () => {
        setIsPosterModalOpen(false);
      },
    });
  };

  const handleEditPoster = (poster) => {
    setSelectedPoster(poster);
    setIsPosterModalOpen(true);
  };

  const handleUpdatePoster = (formData) => {
    updatePoster({ id: selectedPoster._id, formData }, {
      onSuccess: () => {
        setIsPosterModalOpen(false);
        setSelectedPoster(null);
      },
    });
  };

  const handleDeletePoster = (posterId) => {
    if (window.confirm('Are you sure you want to delete this poster?')) {
      deletePoster(posterId);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-wide text-blue-100">Admin Dashboard</p>
        <h1 className="text-3xl font-bold mt-2">Welcome back, {user?.username}</h1>
        <p className="text-blue-100 mt-3">
          You are logged in as {user?.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'Admin'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Role"
          value={user?.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'Normal Admin'}
          description="Current permission level"
          icon={Shield}
        />
        <StatCard
          title="Account Status"
          value={
            user?.isActive === undefined
              ? '---'
              : user?.isActive
              ? 'Active'
              : 'Inactive'
          }
          description={user?.isActive ? 'You have full access' : 'Please contact Super Admin'}
          icon={Activity}
        />
        <StatCard
          title="Username"
          value={user?.username}
          description="Use this to login"
          icon={UserIcon}
        />
      </div>

      {isSuperAdmin && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Admin Statistics</h2>
              <p className="text-sm text-gray-500">Overview of your admin team</p>
            </div>
          </div>

          {isLoadingStats ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Admins"
                value={statsData?.stats?.total ?? '--'}
                description="All registered admins"
              />
              <StatCard
                title="Active Admins"
                value={statsData?.stats?.active ?? '--'}
                description="Active and unlocked"
              />
              <StatCard
                title="Inactive / Locked"
                value={
                  statsData
                    ? `${statsData.stats?.inactive ?? 0} inactive • ${statsData.stats?.locked ?? 0} locked`
                    : '--'
                }
                description="Require attention"
              />
            </div>
          )}
        </div>
      )}

      {/* Poster Management */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Poster Management</h2>
            <p className="text-sm text-gray-500">Manage promotional posters and links</p>
          </div>
          <button
            onClick={() => setIsPosterModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Poster
          </button>
        </div>

        <div className="space-y-4">
          {posters.length === 0 ? (
            <div className="text-center py-12">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posters</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first poster.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posters.map((poster) => (
                <div key={poster._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={poster.imageUrl}
                      alt={poster.altText}
                      className="w-full h-full object-cover"
                    />
                    {!poster.isActive && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Inactive</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {poster.link && <ExternalLink size={14} className="text-blue-600" />}
                        <span className="text-sm text-gray-600">
                          {poster.link ? 'Has Link' : 'No Link'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditPoster(poster)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePoster(poster._id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(poster.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Poster Modal */}
      <PosterFormModal
        isOpen={isPosterModalOpen}
        onClose={() => {
          setIsPosterModalOpen(false);
          setSelectedPoster(null);
        }}
        onSubmit={selectedPoster ? handleUpdatePoster : handleCreatePoster}
        initialData={selectedPoster}
      />
    </div>
  );
};

export default AdminDashboard;
