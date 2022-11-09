import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Matches,
    Max,
    Min,
    IsOptional,
} from 'class-validator';

/**
 * Describes all options that are possible for search
 */
export class SortOptions {
    /**
     * A key word, for which will be searched in the full name of the users.
     */
    @IsString()
    @IsOptional()
    query?: string;
    /**
     * Current page of the database entries
     */
    @Min(0)
    @Max(16)
    @IsNumber()
    @IsOptional()
    page?: number;
    /**
     * Page size of the database entries
     */
    @Min(0)
    @Max(16)
    @IsNumber()
    @IsOptional()
    pageSize?: number;
}
