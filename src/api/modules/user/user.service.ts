import {
    Injectable
} from '@nestjs/common';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    Model
} from 'mongoose';
import { 
    HashService 
} from 'src/api/services/hash.service';
import { 
    User, 
    UserDocument 
} from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model < UserDocument > , private hashService: HashService) {}

    async getUserByUsername(username: string) {
        return this.userModel.findOne({
            username
        })
        .exec();
    }
}