import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
    @ApiProperty()
    text:string
    @ApiProperty()
    productId:number
    @ApiProperty()
    userId:number
}
