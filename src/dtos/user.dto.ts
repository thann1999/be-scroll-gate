import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  SECRET_KEY: string;
}

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['email'])) {}

export class UpdateUserRoleDto {
  @ApiProperty()
  roleId: number;
}

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {
  @ApiProperty()
  remember: boolean;
}
