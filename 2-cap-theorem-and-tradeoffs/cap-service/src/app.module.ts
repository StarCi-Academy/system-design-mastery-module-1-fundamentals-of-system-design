import {
    Module 
} from "@nestjs/common"
import {
    NodeModule 
} from "./node/node.module"

@Module({
    imports: [NodeModule]
})
export class AppModule { }
