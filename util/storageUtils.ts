export function getUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user') || '';
    return JSON?.parse(user);
  }
  return null;
}

export function getIsAdmin() {
  const user = getUser();
  return user?.isAdmin ? user.isAdmin : false;
}
