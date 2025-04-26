import { CanActivateChildFn } from '@angular/router';
import { navigateToUrl } from 'single-spa';

export const AuthGuard: CanActivateChildFn = () => {
  const isLoggedIn = !!sessionStorage.getItem('idTokenFirebase');
  if (!isLoggedIn) {
    navigateToUrl('/login');
    return false;
  }
  return true;
};