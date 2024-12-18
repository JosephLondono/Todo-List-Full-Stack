import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt.payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userCredentials: AuthCredentialsDto) {
    const user = await this.userService.findUserByEmail(userCredentials.email);

    if (user.length > 0) {
      const passwordOk = await bcrypt.compare(
        userCredentials.password,
        user[0].password,
      );

      if (passwordOk) {
        return user;
      }
    }
    return null;
  }

  async login(authCredentials: AuthCredentialsDto) {
    const user = await this.validateUser(authCredentials);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payLoad: JwtPayloadDto = {
      email: user[0].email,
      username: user[0].username,
      id: user[0].id,
    };

    return {
      accesToken: this.jwtService.sign(payLoad),
    };
  }
}
