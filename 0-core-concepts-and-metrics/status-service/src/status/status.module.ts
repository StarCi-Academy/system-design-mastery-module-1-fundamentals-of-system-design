import {
    Module,
} from "@nestjs/common"
import {
    StatusController,
} from "./status.controller"
import {
    StatusService,
} from "./status.service"

/**
 * Module trạng thái Node API.
 * (EN: Node API status module.)
 */
@Module({
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
