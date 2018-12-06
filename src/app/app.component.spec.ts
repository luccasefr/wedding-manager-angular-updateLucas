import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { FormsModule }   from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from './message.service';

var appRoutes:Routes = [
    { path:'login',component:LoginComponent },
    { path:'home',component:HomeComponent },
    { path: '',redirectTo: '/home',pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MessageComponent,
        LoginComponent,
        HomeComponent,
        PageNotFoundComponent
      ],imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule,
        FontAwesomeModule
    ],providers:[{provide: APP_BASE_HREF, useValue: '/'},MessageService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
