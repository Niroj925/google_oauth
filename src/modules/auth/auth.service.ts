import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { generateFromEmail } from 'unique-username-generator';
// import { RegisterUserDto } from './dtos/auth.dto';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth) 
    private userRepository: Repository<Auth>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userRepository.findOne({where:{email:user.email}});

    if (!userExists) {
      const newUser= this.userRepository.create({
        email:user.email,
        userName:user.firstName+" "+user.lastName,
      });
     const nw= await this.userRepository.save(newUser);
      return nw;
    }
    return userExists;
  }
}