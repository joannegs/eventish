import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Apollo, gql } from 'apollo-angular';
import { ISignupResponse } from '../../../interfaces/graphQLResponses-interface';
import { ILoginResponse } from '../../../interfaces/graphQLResponses-interface';

import { Router } from '@angular/router';
import { InfoMessagesService } from '../messages/info-messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN = gql`
    mutation Login($email: String!, $password: String!){
      login(email: $email, password: $password) {
        token
        id
      }
    }
  `

  private SIGNUP = gql`
    mutation SignUp($data: UserInput!){
      createUser(data: $data) {
        token
        id
      }
    }
  `

  constructor(private apollo: Apollo,
    private router: Router, 
    private messageService: InfoMessagesService) { }


  private async setUserState(authUser: { token: string, id: string }) {
    localStorage.setItem('token', authUser.token);
    localStorage.setItem('user_id', authUser.id);

    this.router.navigate(['/dashboard']);
  }

  async signup(user: User) {
    try {
      const { data } = await this.apollo.mutate({
        mutation: this.SIGNUP,
        variables: {
          data: user
        }
      }).toPromise() as ISignupResponse;

      await this.setUserState(data.createUser);

    } catch (error: any) {
      this.messageService.showMessage({ severity: 'error', summary: 'Error while trying to sign up', detail: error.message });
    }
  }

  async login(user: Partial<User>) {
    try {
      const res = await this.apollo
        .mutate({
          mutation: this.LOGIN,
          variables: user
        }).toPromise() as ILoginResponse;

      await this.setUserState(res.data.login);

    } catch (error: any) {
      this.messageService.showMessage({ severity: 'error', summary: 'Error while trying to login', detail: error.message });
    }
  }

  async logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.messageService.showMessage({ severity: 'success', summary: '', detail: 'You have been sucessful logged out' });
  }
}
