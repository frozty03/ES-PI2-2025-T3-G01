import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.services';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { InstituicaoModule } from './instituicoes/instituicao.module';
// import { UserEntity } from './users/user.entity';
import { CursoModule } from './cursos/curso.module';
import { TurmaModule } from './turmas/turma.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DisciplinaModule } from './disciplinas/disciplina.module';
import { AlunoModule } from './alunos/aluno.module';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [
    UserModule,
    InstituicaoModule,
    CursoModule,
    DisciplinaModule,
    TurmaModule,
    AlunoModule,
    NotasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
