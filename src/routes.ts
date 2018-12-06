import { Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { HomeComponent } from './app/home/home.component';
import { ActionsComponent } from './app/actions/actions.component';
import { AuthGuardService } from './app/auth-guard.service';
import { GuestComponent } from './app/guest/guest.component';
import { InviteComponent } from './app/invite/invite.component';
import { PostsComponent } from './app/posts/posts.component';
import { InfoComponent } from './app/info/info.component';
import { GiftListComponent } from './app/gift-list/gift-list.component';
import { PlaylistComponent } from './app/playlist/playlist.component';
import { EventsComponent } from './app/events/events.component';
import { GamesComponent } from './app/games/games.component';
import { TieComponent } from './app/tie/tie.component';
import { GlassesComponent } from './app/glasses/glasses.component';
import { PhotosComponent } from './app/photos/photos.component';

export const appRoutes:Routes = [
    { path:'login',component:LoginComponent },
    { path:'home',component:HomeComponent,canActivate: [AuthGuardService] },
    { path:'guests',component:GuestComponent,canActivate: [AuthGuardService] },
    { path:'posts',component:PostsComponent,canActivate: [AuthGuardService] },
    { path:'actions',component:ActionsComponent,canActivate: [AuthGuardService] },
    { path:'invite',component:InviteComponent,canActivate: [AuthGuardService] },
    { path:'info',component:InfoComponent,canActivate: [AuthGuardService] },
    { path:'gift-list',component:GiftListComponent,canActivate: [AuthGuardService] },
    { path:'playlist',component:PlaylistComponent,canActivate: [AuthGuardService] },
    { path:'events',component:EventsComponent,canActivate: [AuthGuardService] },
    { path:'games',component:GamesComponent,canActivate: [AuthGuardService] },
    { path:'tie',component:TieComponent,canActivate: [AuthGuardService] },
    { path:'glasses',component:GlassesComponent,canActivate: [AuthGuardService] },
    { path:'photos',component:PhotosComponent,canActivate: [AuthGuardService] },
    { path: '',redirectTo: '/home',pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, }
];
