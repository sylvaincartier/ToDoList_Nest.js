import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { truncateSync } from 'fs';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';

export interface RegistrationStatus {
    success: boolean;
    message: string
}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered'
        }
        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            }
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        console.log('token');
        // find user in db
        const user = await this.userService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return { ...token, username: user.username }
    }

    private _createToken({ username }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN;
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return { expiresIn, accessToken }
    }
    
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
