import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';
import { InfoMessagesService } from '../messages/info-messages.service';
import { IGetUserByEmail, IGetUserByID} from 'src/app/interfaces/graphQLResponses-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getUserByEmail: QueryRef<IGetUserByEmail, {email: string}>
  private getUserByID: QueryRef<IGetUserByID, {id: string}>
  
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
    try{
      const result = await this.getUserByEmail.refetch({ email });
      return result.data.userByEmail as User;
    } catch(error: any) {
      this.messageService.showMessage({severity: 'error', summary: error.message, detail: ''});
      throw(error);
    }    
  }

    async getUserbyID(id: string): Promise<User> {
      try{
        const result = await this.getUserByID.refetch({ id: id });
        return result.data.user as User;
      } catch(error: any) {
        this.messageService.showMessage({severity: 'error', summary: error.message, detail: ''});
        throw(error);
      }    
  }

  async getLoggedUser(): Promise<User> {
    try{
      const result = await this.getUserByID.refetch({ id: `${localStorage.getItem('user_id')}` });
      return result.data.user as User;
    } catch(error: any) {
      this.messageService.showMessage({severity: 'error', summary: error.message, detail: ''});
      throw(error);
    }    
}

}