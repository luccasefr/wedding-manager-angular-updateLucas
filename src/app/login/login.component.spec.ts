import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['Login','clear']);
    const messagSpy = jasmine.createSpyObj('MessageService', ['CallFunc']);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule,FormsModule,HttpClientModule,RouterTestingModule],
      providers: [{provide:AuthService,useValue:authSpy},{provide:MessageService, useValue:messagSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login when submit and navigate to home',()=>{
      // fixture.detectChanges();
      // authServiceSpy.Login.and.callFake(()=>{console.log('test')});
      let authService:jasmine.SpyObj<AuthService> = TestBed.get(AuthService)
      let router:Router = TestBed.get(Router);

      authService.Login.and.returnValue(new Promise((res,rej)=>{res('loged')}));
      spyOn(router,'navigate').and.callFake(()=>{console.log('navigate caled')});

      const hostElement = fixture.nativeElement;
      const form : HTMLInputElement = hostElement.querySelector('form');

      component.user.email = 'contato@diegomatias.com.br';
      component.user.password = '123456';

      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      fixture.whenStable().then(()=>{
          expect(authService.Login).toHaveBeenCalledWith({email:'contato@diegomatias.com.br',password:'123456'});
          expect(router.navigate).toHaveBeenCalledWith(['/home']);
      });
  });

  it('should show error when login credetianls are wrong',()=>{
      let authService:jasmine.SpyObj<AuthService> = TestBed.get(AuthService);
      let message:jasmine.SpyObj<MessageService> = TestBed.get(MessageService);

      authService.Login.and.returnValue(new Promise((res,rej)=>{rej({status:401})}));

      const hostElement = fixture.nativeElement;
      const form : HTMLInputElement = hostElement.querySelector('form');

      component.user.email = 'contato@diegomatias.com.br';
      component.user.password = '123456';

      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      fixture.whenStable().then(()=>{
          expect(message.CallFunc).toHaveBeenCalledWith('ShowMessage',{title:'Error',message:'Senha ou email incorretos por favor tente novamente'});
      });
  });
});
