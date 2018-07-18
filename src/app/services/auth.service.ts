// services/auth.service.ts
import { Injectable } from '@angular/core';

// We want to avoid any 'name not found'
// warnings from TypeScript
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  private YOUR_AUTH0_CLIENT_ID = 'Adpvbg_TwPETm23za7gvj7jSO0PXkb-w';
  private YOUR_AUTH0_DOMAIN = 'lifedent.eu.auth0.com';

  lock = new Auth0Lock(this.YOUR_AUTH0_CLIENT_ID, this.YOUR_AUTH0_DOMAIN);

  login() {
    this.lock.show((error: string, profile: Object, id_token: string) => {
      if (error) {
        console.log(error);
      }
      // We get a profile object for the user from Auth0
      localStorage.setItem('profile', JSON.stringify(profile));
      // We also get the user's JWT
      localStorage.setItem('id_token', id_token);
    });
  }

  logout() {
    // To log out, we just need to remove
    // the user's profile and token
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
}
