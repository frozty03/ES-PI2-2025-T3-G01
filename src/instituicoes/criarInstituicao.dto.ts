import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}