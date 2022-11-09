import { UserDto } from '../../model/user.dto';

export const userValid: Partial<UserDto> = {
    username: 'test_name',
    fullname: 'Valid Name',
    number: '+490568977686',
};
export const userInvalidNames: Partial<UserDto> = {
    username: 'test_Name',
    fullname: 'Valid 00',
    number: '+490568977686',
};
export const userInvalidNumber: Partial<UserDto> = {
    username: 'test_name',
    fullname: 'Valid Name',
    number: '',
};
