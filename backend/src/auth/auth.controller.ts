import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.validateUser(signInDto.email, signInDto.password)
            .then((user) => {
                if (!user) {
                    // Return generic error or throw Unauthorized
                    throw new Error('Invalid credentials');
                }
                return this.authService.login({ ...user, id: user.id }); // Ensure ID is passed if validateUser returns it (it does)
            });
    }

    @Post('register')
    register(@Body() signUpDto: Record<string, any>) {
        return this.authService.register(signUpDto.email, signUpDto.password, signUpDto.name);
    }
}
