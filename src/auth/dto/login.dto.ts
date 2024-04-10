import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  
    @ApiProperty({
        description: 'The email address of the user.',
        example: 'john@example.com',
      })
      @IsNotEmpty()
      @IsEmail({}, { message: 'Please enter a correct email address' })
      readonly email: string;
    
      @ApiProperty({
        description: 'The password for the user account.',
        example: 'password123',
      })
      @IsNotEmpty()
      @IsString()
      @MinLength(6)
      readonly password: string;
}