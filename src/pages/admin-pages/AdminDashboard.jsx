import { Activity, Shield, User as UserIcon } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useAdminStats } from '../../hooks/useAdmin';
import { ROLES } from '../../utils/constants';

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
    </div>
  );
};

export default AdminDashboard;
