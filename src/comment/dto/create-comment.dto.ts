import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    contents: string;
}