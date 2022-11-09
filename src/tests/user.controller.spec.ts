import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../model/user.schema';
import { Model } from 'mongoose';
import { rootMongooseTestModule } from './mongo/mongoose.test.module';
import { UserDto } from '../model/user.dto';
import { plainToInstance } from 'class-transformer';
import { userValid } from './fixtures/user.fixture';

describe('UserController', () => {
    let userController: UserController;
    let mockUserModel: Model<UserDocument>;
    let mockService: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                ]),
            ],
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = module.get<UserController>(UserController);
        // Make sure to use the correct Document Type for the 'module.get' func
        mockUserModel = module.get<Model<UserDocument>>(
            getModelToken(User.name),
        );
        mockService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(mockService).toBeDefined();
        expect(mockUserModel).toBeDefined();
        expect(userController).toMatchSnapshot();
    });

    describe('root', () => {
        it('should return "Hello World!"', async () => {
            const dto = plainToInstance(UserDto, userValid);
            await mockService.add(dto);
            const users = await mockService.findAll();
            // assert
            expect(users.length).toBe(1);
        });
    });
});
