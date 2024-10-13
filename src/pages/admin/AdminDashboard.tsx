import React from 'react';
import { StatWidget } from '../../components/widgets/StatWidget';
import { Users, Package, Clock3, DollarSign, Table } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget
          title="Projects"
          value="12"
          icon={<Package size={36} strokeWidth={0.8}/>}
          trend={{ value: 8, isPositive: true }}
        />
         <StatWidget
          title="Members"
          value="1,234"
          icon={<Users size={36} strokeWidth={0.8}/>}
          trend={{ value: 12, isPositive: true }}
        />
        <StatWidget
          title="Hours"
          value="867"
          icon={<Clock3 size={36} strokeWidth={0.8}/>}
          trend={{ value: 3, isPositive: false }}
        />
        <StatWidget
          title="Revenue"
          value="$54,321"
          icon={<DollarSign size={36} strokeWidth={0.8}/>}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      <h2 className="text-xl font-bold mt-6">Recent Projects</h2>

    </div>
  );
};
