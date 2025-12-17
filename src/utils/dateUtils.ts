export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if not a valid date (fallback for legacy data)
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than 1 hour (3600 seconds)
  if (diffInSeconds < 3600) {
    return 'Just now';
  }

  // Less than 1 day (86400 seconds)
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // Less than 1 week (604800 seconds)
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // Less than 1 month (approx 30 days)
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  // Less than 1 year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  // Years
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};
