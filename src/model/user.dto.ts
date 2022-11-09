import { IsNotEmpty, IsString, Matches } from 'class-validator';

/**
 * Describes the data transfer object for a user model. It is contained in the body of a http request and automatically
 * parsed and validated by "NestJs"
 */
export class UserDto {
    /**
     * Full name of the user, this should only contain lower- and uppercase letters.
     */
    @Matches(/^[a-zA-Zäöü ,.'-]+$/, {
        message: 'Valid name must be supplied, only containing letters.',
    })
    fullname: string;

    /**
     * Telephone number of the user
     */
    @IsNotEmpty({ message: 'A valid telephone number must be supplied.' })
    number: string;

    /**
     * Username wich only consists of lowercase letters, an underscore and numbers.
     */
    @Matches(/^[a-zäöü0-9ÄÖÜ]+[a-zäöü0-9ÄÖÜ_]*$/, {
        message:
            'Valid username in snake_case must be supplied, only containing lowercase letters or numbers.',
    })
    username: string;
}
