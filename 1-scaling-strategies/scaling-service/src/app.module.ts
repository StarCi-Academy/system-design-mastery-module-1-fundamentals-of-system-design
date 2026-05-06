import {
    Module,
} from "@nestjs/common"
import {
    TaskModule,
} from "./task"

/**
 * Module gốc — Quản lý dependencies chung.
 * (EN: Root module — Manages global dependencies.)
 */
@Module({
    imports: [
        // Module tác vụ — xử lý CPU intensive task
        // (EN: Task module — handles CPU intensive task)
        TaskModule,
    ],
})
export class AppModule {}
