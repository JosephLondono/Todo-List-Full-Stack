import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadDto } from '../../dto/jwt.payload.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secretKey'),
    });
  }

  async valite(payload: JwtPayloadDto) {
    const users = await this.userService.findUserByEmail(payload.email);
    if (!users || users.length === 0) throw new UnauthorizedException();
    const user = users[0];
    user.password = undefined;
    return user;
  }
}
