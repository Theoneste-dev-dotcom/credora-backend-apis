import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/user.service';
import { CreateUserDto } from 'src/dtos/create-user-dto';
import { UserResponseDto } from 'src/dtos/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const savedUser = this.usersService.create({ ...createUserDto, password: hashedPassword });
    return savedUser;
    

    // return {
    //   id: savedUser.id,
    //   fullName: savedUser.fullName,
    //   email: savedUser.email,
    //   phoneNumber: savedUser.phoneNumber,
    //   address: savedUser.address,
    // };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRY') }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRY') }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('JWT_SECRET') });
      const user = await this.usersService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const newPayload = { email: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(newPayload, { expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRY') }),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}