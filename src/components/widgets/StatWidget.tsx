import React from 'react';

interface StatWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatWidget: React.FC<StatWidgetProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="text-gray-500">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      {trend && (
        <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span className={`mr-1 ${trend.isPositive ? 'transform rotate-180' : ''}`}>▼</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="ml-1 text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};
