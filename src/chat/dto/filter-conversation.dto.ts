import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class FilterConversation {
  @ApiModelPropertyOptional()
  before?: Date;

  @ApiModelPropertyOptional()
  after?: Date;

  @ApiModelPropertyOptional()
  limit?: number;

  @ApiModelPropertyOptional()
  page?: number;
}
