import {
    Module 
} from "@nestjs/common"
import {
    HttpModule 
} from "@nestjs/axios"
import {
    NodeController 
} from "./node.controller"
import {
    NodeService 
} from "./node.service"

@Module({
    imports: [HttpModule],
    controllers: [NodeController],
    providers: [NodeService]
})
export class NodeModule { }
