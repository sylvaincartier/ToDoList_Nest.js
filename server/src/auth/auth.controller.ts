import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if(!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }
}
