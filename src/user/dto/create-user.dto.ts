import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({default:"anna"})
    name:string
    @ApiProperty({default:"anyan"})
    surname:string
}
