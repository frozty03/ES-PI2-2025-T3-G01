// Feito por: Davi Froza


import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),

        JwtModule.registerAsync({
            imports: [ConfigModule], // para ler o .env
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // pegar a chave do .env
                signOptions: { expiresIn: '48h'}, // o token vale por dois dias
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {}; 