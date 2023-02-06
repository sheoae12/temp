import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    contents: string;

    @IsString()
    @IsNotEmpty()
    @Length(12)
    date: string;
}