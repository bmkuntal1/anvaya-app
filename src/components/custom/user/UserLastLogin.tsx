export const UserLastLogin = ({ lastLogin }: { lastLogin: string }) => {

  if (!lastLogin) {
    return <span className="text-xs text-gray-800">Never</span>;
  }

  const lastLoginDate = new Date(lastLogin);
  return <span className="text-xs text-gray-800">{lastLoginDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })} at {lastLoginDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })}</span>;
};