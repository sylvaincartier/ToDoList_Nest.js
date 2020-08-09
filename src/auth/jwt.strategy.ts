import { PassportStrategy } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
        return user;
    }
}