import {
    Module,
} from "@nestjs/common"
import {
    ProcessController,
} from "./process.controller"
import {
    ProcessService,
} from "./process.service"

/**
 * Module xử lý process.
 * (EN: Process module.)
 */
@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
})
export class ProcessModule {}
