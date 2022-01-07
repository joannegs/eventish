import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';
import { InfoMessagesService } from '../messages/info-messages.service';
import { IGetUserByEmail, IGetUserByID, 
  IForgotPassword, IResetPassword } from 'src/app/interfaces/graphQLResponses-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getUserByEmail: QueryRef<IGetUserByEmail, { email: string }>;
  private getUserByID: QueryRef<IGetUserByID, { id: string }>;

  private FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!){
    forgotPassword(email: $email)
  }
`

  private RESET_PASSWORD = gql`
mutation resetPassword($token: String!, $password: String!){
  resetPassword(token: $token, password: $password)
}
`

  constructor(private apollo: Apollo,
    private router: Router,
    private messageService: InfoMessagesService) {

    this.getUserByEmail = this.apollo.watchQuery({
      query: gql`
        query getByEmail($email: String!){
          userByEmail(email: $email){
            name
            email
            _id
          }
        }
      `
    }),

      this.getUserByID = this.apollo.watchQuery({
        query: gql`
        query getById($id: ID!){
          user(id: $id){
            name
            email
            _id
          }
        }
      `
      })
  }

  async getUserbyEmail(email: string): Promise<User> {
    try {
      const result = await this.getUserByEmail.refetch({ email });
      return result.data.userByEmail as User;
    } catch (error: any) {
      this.messageService.showMessage({ severity: 'error', summary: error.message, detail: '' });
      throw (error);
    }
  }

  async getUserbyID(id: string): Promise<User> {
    try {
      const result = await this.getUserByID.refetch({ id: id });
      return result.data.user as User;
    } catch (error: any) {
      this.messageService.showMessage({ severity: 'error', summary: error.message, detail: '' });
      throw (error);
    }
  }

  async getLoggedUser(): Promise<User> {
    try {
      const result = await this.getUserByID.refetch({ id: `${localStorage.getItem('user_id')}` });
      return result.data.user as User;
    } catch (error: any) {
      this.messageService.showMessage({ severity: 'error', summary: error.message, detail: '' });
      throw (error);
    }
  }

  async handleForgotPassword(email: string) {
    try {
      await this.apollo.mutate({
        mutation: this.FORGOT_PASSWORD,
        variables: {
          email: email
        }
      }).toPromise() as IForgotPassword;

    } catch(error: any){
      this.messageService.showMessage({ severity: 'error', summary: error.message, detail: ''})
    }
  }

  async handleResetPassword(token: string, password: string) {
    try {
      await this.apollo.mutate({
        mutation: this.RESET_PASSWORD,
        variables: {
          token: token,
          password: password
        }
      }).toPromise() as IResetPassword;

    } catch(error: any){
      this.messageService.showMessage({ severity: 'error', summary: error.message, detail: ''})
    }
  }

}