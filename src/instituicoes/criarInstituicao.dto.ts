import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  nome: string;
}
