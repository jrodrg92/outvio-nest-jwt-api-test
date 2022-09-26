import { Injectable } from '@nestjs/common';

import { HashService } from './services/hash.service';

@Injectable()
export class AppService {
  constructor(private hashService: HashService){}
  async getHashOfPasswd(passwd: string){
    return await this.hashService.hashPassword(passwd);
  }
}
