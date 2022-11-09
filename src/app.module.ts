import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {}
