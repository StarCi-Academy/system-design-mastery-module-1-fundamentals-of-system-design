import {
    Controller,
    Get,
    Query,
} from "@nestjs/common"
import {
    ProcessService,
} from "./process.service"

/**
 * Controller xử lý luồng System Design Process.
 * (EN: Controller handling System Design Process flow.)
 */
@Controller("process")
export class ProcessController {
    constructor(
        private readonly processService: ProcessService,
    ) {}

    /**
     * GET /process/1-clarify — Bước 1: Làm rõ yêu cầu.
     * (EN: GET /process/1-clarify — Step 1: Clarify requirements.)
     */
    @Get("1-clarify")
    clarify(@Query("name") name: string = "Ticket Booking System") {
        return this.processService.clarify(name)
    }

    /**
     * GET /process/2-estimate — Bước 2: Ước lượng quy mô.
     * (EN: GET /process/2-estimate — Step 2: Estimate scale.)
     */
    @Get("2-estimate")
    estimate(@Query("dau") dau: string = "1000000") {
        return this.processService.estimate(parseInt(dau, 10))
    }

    /**
     * GET /process/3-design — Bước 3: Thiết kế kiến trúc tổng thể.
     * (EN: GET /process/3-design — Step 3: High-level design.)
     */
    @Get("3-design")
    design() {
        return this.processService.getHighLevelDesign()
    }

    /**
     * GET /process/4-deep-dive — Bước 4: Tinh chỉnh chi tiết.
     * (EN: GET /process/4-deep-dive — Step 4: Deep dive.)
     */
    @Get("4-deep-dive")
    deepDive() {
        return this.processService.deepDive()
    }
}
