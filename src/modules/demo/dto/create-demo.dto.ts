import { IsNotEmpty, IsString } from 'class-validator';

export class DemoDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
