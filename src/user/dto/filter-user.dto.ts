import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class FilterUserDTO {
  @ApiModelPropertyOptional()
  search?: string;

  @ApiModelPropertyOptional()
  before?: Date;

  @ApiModelPropertyOptional()
  after?: Date;

  @ApiModelPropertyOptional()
  limit?: number;

  @ApiModelPropertyOptional()
  page?: number;
}
