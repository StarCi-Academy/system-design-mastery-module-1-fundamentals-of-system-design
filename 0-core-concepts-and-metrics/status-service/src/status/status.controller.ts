import {
  Controller, Get
} from "@nestjs/common"
import {
  StatusService
} from "./status.service"

@Controller("api")
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  /**
   * GET /api/status — Trả về trạng thái server kèm hostname container
   * (EN: GET /api/status — Returns server status with container hostname)
   *
   * Khi Load Balancer (Nginx) dùng round-robin, mỗi lần gọi sẽ trả hostname khác nhau,
   * chứng minh traffic đang được phân tán đều qua các node
   * (EN: With Nginx round-robin, each call returns a different hostname,
   * proving traffic is being distributed evenly across nodes)
   *
   * @returns {{ status: string, servedBy: string, timestamp: string }}
   */
  @Get("status")
  getStatus() {
    // Gọi service để lấy thông tin trạng thái (EN: call service to get status info)
    return this.statusService.getStatus()
  }
}
