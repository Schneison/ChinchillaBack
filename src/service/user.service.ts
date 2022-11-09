import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expression, FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import { UserDto } from '../model/user.dto';
import { SortOptions } from '../model/sort_options.dto';

/**
 * User service which supplies methods to interact with the database.
 */
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    /**
     * Creates a new db entry for the given user.
     *
     * @param userDto Information which should be added to the database.
     */
    async add(userDto: UserDto): Promise<User> {
        const foundUser = await this.get(userDto.username);
        if (foundUser) {
            throw new HttpException(
                'Username already used.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    /**
     * Removes the user from the database with the given name.
     *
     * @param username Name of the user to be removed
     */
    async remove(username: string): Promise<User> {
        const foundUser = await this.get(username);
        if (!foundUser) {
            throw new HttpException(
                'No user with this username found that could be removed.',
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.userModel.findOneAndRemove({ username }).exec();
    }

    /**
     * Updates a user entry in the database.
     *
     * @param username
     * @param userDto Information which should be updated
     */
    async edit(username: string, userDto: UserDto): Promise<User> {
        await this.userModel
            .findOneAndUpdate({ username: username }, userDto)
            .exec();
        return this.get(userDto.username);
    }

    /**
     * Retrieves the user with the given name.
     *
     * @param username Name of the user to be retrieved
     */
    async get(username?: string): Promise<User> {
        return await this.userModel.findOne({ username }).exec();
    }

    /**
     * Selects all user entities of the database which match the given options.
     *
     * @param options Options which filter the retrieved entries
     */
    async findAll(options?: SortOptions): Promise<User[]> {
        const filter: FilterQuery<UserDocument> = {};
        // Text index needed for search (mongodb)
        if (options?.query) {
            filter.$text = { $search: options.query };
        }
        return this.userModel.find(filter).exec();
    }
}
