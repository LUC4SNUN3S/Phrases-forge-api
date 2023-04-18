import { ApiProperty } from '@nestjs/swagger';
import { VERSION_UUID } from '@src/config/app';
import { MessagesValidations as Msgs } from '@src/core/constants/messages-validations';
import { IsOptional, IsUUID } from 'class-validator';
export class CategoryIdDto {
  @IsUUID(VERSION_UUID, { message: Msgs.IsUuid('categoria') })
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId: string;
}
