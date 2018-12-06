import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('sould login correctly',inject([AuthService], async(service: AuthService)=>{
      let user = await service.Login({email:'jm@gmail.com',password:'123456'});
      expect(user.name_1).toEqual('João Alberto Augusto');
      expect(user.name_2).toEqual('Maria José Ferreira');
  }));

  it('sould check if is loged correctly',inject([AuthService], async(service: AuthService)=>{
      service.clear();
      expect(service.IsLogged()).toBeFalsy();
      let user = await service.Login({email:'jm@gmail.com',password:'123456'});
      expect(service.IsLogged()).toBeTruthy();
  }));

});
