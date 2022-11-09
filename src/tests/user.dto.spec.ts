import { validate, ValidationError } from 'class-validator';
import { UserDto } from '../model/user.dto';
import { plainToInstance } from 'class-transformer';
import {
    userInvalidNames,
    userInvalidNumber,
    userValid,
} from './fixtures/user.fixture';

describe('UserDto', () => {
    it('valid DTO', async () => {
        const dto = plainToInstance(UserDto, userValid);
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
    it('invalid username and fullname', async () => {
        const dto = plainToInstance(UserDto, userInvalidNames);
        const errors = await validate(dto);
        // Should give an error cause by invalid full name
        expect(errors).toContainEqual(
            expect.objectContaining({
                property: 'fullname',
                constraints: {
                    matches:
                        'Valid name must be supplied, only containing letters.',
                },
            }),
        );
        // Should also give an error cause by invalid username
        expect(errors).toContainEqual(
            expect.objectContaining({
                property: 'username',
                constraints: {
                    matches:
                        'Valid username in snake_case must be supplied, only containing lowercase letters or numbers.',
                },
            }),
        );
    });
    it('invalid number', async () => {
        const dto = plainToInstance(UserDto, userInvalidNumber);
        const errors = await validate(dto);
        // Should give an error cause by invalid number
        expect(errors).toContainEqual(
            expect.objectContaining({
                property: 'number',
                constraints: {
                    isNotEmpty: 'A valid telephone number must be supplied.',
                },
            }),
        );
    });
});
