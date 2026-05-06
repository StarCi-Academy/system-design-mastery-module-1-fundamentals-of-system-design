import {
    Controller,
    Get,
    Query,
} from "@nestjs/common"
import {
    TaskService,
} from "./task.service"

/**
 * Controller xử lý các tác vụ kiểm thử tải.
 * (EN: Controller handling load testing tasks.)
 */
@Controller("api")
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) {}

    /**
     * GET /api/heavy — Thực hiện tác vụ nặng để stress CPU/RAM.
     * (EN: GET /api/heavy — Performs heavy task to stress CPU/RAM.)
     *
     * Logic — Dùng để minh họa sự khác biệt khi nâng cấp tài nguyên (Vertical) hoặc tăng số lượng node (Horizontal).
     * (EN Logic: Used to demonstrate difference when upgrading resources (Vertical) or increasing node count (Horizontal).)
     */
    @Get("heavy")
    handleHeavyTask(@Query("load") load: string) {
        const iterations = parseInt(load, 10) || 10000000
        return this.taskService.runHeavyCalculation(iterations)
    }

    /**
     * GET /api/status — Kiểm tra trạng thái và định danh node.
     * (EN: GET /api/status — Check status and node identity.)
     */
    @Get("status")
    getStatus() {
        return this.taskService.getStatus()
    }
}
