import { CustomDecorator, SetMetadata } from "@nestjs/common"

export const IS_PUBLIC = 'isPublic'

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC, true) 