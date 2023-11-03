import { ENV, Message, hashPassword, validatePassword } from '@common';
import { LoginUserDto, UserDto } from '@dtos';
import { UserEntity } from '@entities';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { TokenService, UserService } from '@services';
import { instanceToPlain } from 'class-transformer';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    if (createUserDto.SECRET_KEY !== this.configService.get(ENV.JWT_SECRET)) {
      throw new BadRequestException(Message.NOT_PERMISSION);
    }

    const existUser = await this.userService.findByEmail(createUserDto.email);

    if (existUser) {
      throw new BadRequestException(Message.EMAIL_EXIST);
    }

    const password = await hashPassword(createUserDto.password);
    const user = new UserEntity({
      ...createUserDto,
      password,
    });
    const createdUser: UserEntity = await this.userService.create(user);

    return instanceToPlain(createdUser);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    const isSuccess = await validatePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isSuccess) {
      throw new UnauthorizedException(Message.WRONG_LOGIN_INFO);
    }

    return {
      accessToken: await this.tokenService.generateJwtToken(user),
    };
  }
}
