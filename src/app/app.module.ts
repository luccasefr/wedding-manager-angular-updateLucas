import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { ActionsComponent } from './actions/actions.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomHttpService } from './custom-http.service';
import { ActionService } from './action.service';
import { HelperService } from './helper.service';
import { GuestComponent } from './guest/guest.component';
import { GuestService } from './guest.service';
import { ContextComponent } from './context/context.component';
import { InviteComponent } from './invite/invite.component';
import { InviteService } from './invite.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { PostsComponent } from './posts/posts.component';
import { SensibleWordsService } from './sensible-words.service';
import { UserService } from './user.service';
import { PostsService } from './posts.service';
import { InfoComponent } from './info/info.component';
import { GiftListComponent } from './gift-list/gift-list.component';
import { GiftListService } from './gift-list.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistService } from './playlist.service';
import { GamesComponent } from './games/games.component';
import { EventsComponent } from './events/events.component';
import { TieComponent } from './tie/tie.component';
import { GlassesComponent } from './glasses/glasses.component';
import { PhotosComponent } from './photos/photos.component';
import { EventService } from './event.service';
import { TiepieceService } from './tiepiece.service';
import { TiebuyService } from './tiebuy.service';

//charts

import { ChartsModule } from 'ng2-charts';
import { TesteComponent } from './teste/teste.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    MessageComponent,
    ActionsComponent,
    NavBarComponent,
    GuestComponent,
    ContextComponent,
    InviteComponent,
    PostsComponent,
    InfoComponent,
    GiftListComponent,
    PlaylistComponent,
    GamesComponent,
    EventsComponent,
    TieComponent,
    GlassesComponent,
    PhotosComponent,
    TesteComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,NgbModule.forRoot(),
    ColorPickerModule,
    ChartsModule
  ],
  providers: [
      AuthService,
      AuthGuardService,
      MessageService,
      CustomHttpService,
      ActionService,
      HelperService,
      GuestService,
      InviteService,
      SensibleWordsService,
      UserService,
      PostsService,
      GiftListService,
      PlaylistService,
      EventService,
      TiepieceService,
      TiebuyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
