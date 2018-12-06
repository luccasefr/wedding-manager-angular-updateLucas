import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../environments/environment';

@Injectable()
export class TiebuyService {

  constructor(private http:CustomHttpService) { }

  /**
     * Envia uma requisição para o servidor para que ele retorne todos os eventos do usuario
     * que está autenticado
     */
    getAll(): Promise<any> {
      return new Promise((res, rej) => {
          this.http.get(environment.apiUrl + 'api/tiebuy').then((response) => {
              res(response);
          }).catch((err) => {
              rej(err);
          });
      });
  }

}
