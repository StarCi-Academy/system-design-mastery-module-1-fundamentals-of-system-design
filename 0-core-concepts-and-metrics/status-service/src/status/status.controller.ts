import {
    Controller,
    Get,
} from "@nestjs/common"
import {
    StatusService,
} from "./status.service"

/**
 * Controller xử lý endpoint trạng thái của Node.
 * (EN: Controller handling Node status endpoint.)
 */
@Controller("api")
export class StatusController {
    constructor(
        private readonly statusService: StatusService,
    ) {}

    /**
     * GET /api/status — Trả về trạng thái server kèm hostname container.
     * (EN: GET /api/status — Returns server status with container hostname.)
     *
     * Logic — Khi Nginx gọi các Node theo Round-robin, hostname trả về sẽ thay đổi.
     * (EN Logic: When Nginx calls Nodes via Round-robin, returned hostname will change.)
     */
    @Get("status")
    getStatus() {
        return this.statusService.getStatus()
    }
}
