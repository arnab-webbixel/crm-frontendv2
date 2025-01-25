import React from 'react';
import { Phone, PhoneOff, PhoneMissed } from 'lucide-react';

const statusConfig = {
  active: { icon: Phone, className: 'text-green-500', label: 'Active' },
  pending: { icon: Phone, className: 'text-yellow-500', label: 'Pending' },
  missed: { icon: PhoneMissed, className: 'text-red-500', label: 'Missed' },
  completed: { icon: PhoneOff, className: 'text-gray-500', label: 'Completed' },
};

export function CallStatus({ status }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${config.className}`} />
      <span className={`text-sm ${config.className}`}>{config.label}</span>
    </div>
  );
}
