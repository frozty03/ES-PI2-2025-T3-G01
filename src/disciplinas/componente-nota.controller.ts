// Desenvolvido por Miguel Afonso Castro de Almeida
import { Controller, Put, Delete, Param, Body } from '@nestjs/common';
import { ComponenteNotaService } from './componente-nota.service';
import { AtualizarComponenteNotaDTO } from './dto/atualizar-componente-nota.dto';

@Controller('componentes-nota')
export class ComponenteNotaController {
    constructor(private readonly componenteNotaService: ComponenteNotaService) {}

    @Put(':id')
    async atualizarComponenteNota(@Param('id') id: string,@Body() dto: AtualizarComponenteNotaDTO) {
        return await this.componenteNotaService.atualizar(id, dto);
    }

    @Delete(':id')
    async deletarComponenteNota(@Param('id') id: string) {
        await this.componenteNotaService.deletar(id);
        return { message: 'Componente de nota excluído.' };
    }
}