import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    private readonly users = [
        { username: 'lukas', password: 'test', role: 'user' },
    ];

    @Post('login')
    login(@Body() body: { username: string; password: string }) {
        const { username, password } = body;

        const user = this.users.find(user => user.username === username && user.password === password);

        if (user) {
            return { success: true, username: user.username, role: user.role };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    }
}
