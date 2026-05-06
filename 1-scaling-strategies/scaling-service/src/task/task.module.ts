import {
    Module,
} from "@nestjs/common"
import {
    TaskController,
} from "./task.controller"
import {
    TaskService,
} from "./task.service"

/**
 * Module xử lý tác vụ.
 * (EN: Task processing module.)
 */
@Module({
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
