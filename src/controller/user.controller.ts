import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    UploadedFiles,
    Put,
    Req,
    Res,
    HttpException,
    Query,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { UserDto } from '../model/user.dto';
import { SortOptions } from '../model/sort_options.dto';
/**
 * User controller which acts as a layer between the service and the http
 * requests.
 */
@Controller('/api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/all')
    async getAll(@Res() response, @Query() options: SortOptions) {
        const users = await this.userService.findAll(options);
        return response.status(HttpStatus.OK).json(users);
    }

    @Post('/remove')
    async remove(@Res() response, @Body('username') username: string) {
        const user = await this.userService.remove(username);
        if (!user) {
            throw new HttpException(
                'No user with this username found that could be removed.',
                HttpStatus.BAD_REQUEST,
            );
        }
        return response.status(HttpStatus.OK).json(user);
    }

    @Post('/add')
    async add(@Res() response, @Body() userDto: UserDto) {
        const user = await this.userService.add(userDto);
        return response.status(HttpStatus.CREATED).json(user);
    }

    @Post('/test')
    async addTest(@Res() response, @Body() userDto: UserDto) {
        return response.status(HttpStatus.OK).json(userDto);
    }

    @Post('/edit')
    async edit(
        @Res() response,
        @Body() userDto,
        @Query('username') oldUserName,
    ) {
        const user = await this.userService.edit(oldUserName, userDto);
        if (!user) {
            throw new HttpException(
                'No user with this username found.',
                HttpStatus.BAD_REQUEST,
            );
        }
        return response.status(HttpStatus.OK).json(user);
    }
}
