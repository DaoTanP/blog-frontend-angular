import { AuthService } from '@/core/services/auth.service';

export function appInitializer(authService: AuthService) {
  // attempt to refresh token on app start up to auto authenticate
  return () => authService.refreshAccessToken();
}
