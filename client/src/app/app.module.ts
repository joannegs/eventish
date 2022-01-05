import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CustomHttpInterceptor } from './core/interceptors/http-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PrimengModule } from './modules/primeng.module';
import { IconsModule } from './modules/icons.module';
import { GraphQLModule } from './modules/graphql.module';
import { InviteModule } from './modules/invite.module';
import { UserModule } from './modules/user.module';
import { EventsModule } from './modules/events.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    DashboardComponent,
    HeaderComponent,
    ResetPasswordComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    IconsModule,
    PrimengModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,   
    ToastModule, 

    EventsModule,
    FormsModule,
    InviteModule,
    UserModule,

    AppRoutingModule,
  ],
  
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]

})
export class AppModule { }
