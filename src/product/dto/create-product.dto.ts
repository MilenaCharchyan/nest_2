import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    price:number
    @ApiProperty()
    count:number
    @ApiProperty()
    userId:number

}
