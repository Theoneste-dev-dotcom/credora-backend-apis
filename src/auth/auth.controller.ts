import { Controller, Post, Body, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from 'src/dtos/create-user-dto';
import { UserResponseDto } from 'src/dtos/user-response.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { LoginResponseDto } from 'src/dtos/login-response.dto';
import { CreateInstitutionDto } from 'src/institutions/dtos/create-institution.dto';
import { InstitutionResponseDto } from 'src/institutions/dtos/institution-response.dto';
import { LoginInstitutionDto } from 'src/institutions/dtos/login-institution.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: UserResponseDto })
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.authService.signup(createUserDto);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  
  @Post('signup-institution')
  @ApiOperation({ summary: 'Sign up a new institution' })
  @ApiBody({ type: CreateInstitutionDto })
  @ApiResponse({ status: 201, description: 'Institution successfully registered', type: InstitutionResponseDto })
  async signupInstitution(@Body() createInstitutionDto: CreateInstitutionDto): Promise<InstitutionResponseDto> {
    return this.authService.signupInstitution(createInstitutionDto);
  }

  @Post('login-institution')
  @ApiOperation({ summary: 'Login an institution' })
  @ApiBody({ type: LoginInstitutionDto })
  @ApiResponse({ status: 200, description: 'Institution successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loginInstitution(@Body() loginInstitutionDto: LoginInstitutionDto) {
    const institution = await this.authService.validateInstitution(
      loginInstitutionDto.email,
      loginInstitutionDto.password,
    );
    if (!institution) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.loginInstitution(institution);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ schema: { example: { refreshToken: 'your_refresh_token' } } })
  @ApiResponse({ status: 200, description: 'Access token refreshed', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.body.refreshToken;
    return this.authService.refreshToken(refreshToken);
  }
}




