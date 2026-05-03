import {
    Injectable, Logger 
} from "@nestjs/common"
import * as os from "os"

@Injectable()
export class StatusService {
    private readonly logger = new Logger(StatusService.name)

    /**
   * Trả về trạng thái server kèm hostname của container đang xử lý request
   * (EN: Returns server status with the hostname of the container handling the request)
   *
   * Hostname chính là tên container Docker — mỗi instance scale ra sẽ có hostname khác nhau,
   * giúp ta xác minh Load Balancer đang route đúng theo round-robin
   * (EN: Hostname is the Docker container name — each scaled instance has a different hostname,
   * allowing us to verify Load Balancer is routing correctly via round-robin)
    */
    getStatus() {
    // Lấy hostname từ hệ điều hành — trong Docker, đây là container ID / tên container
    // (EN: Get hostname from OS — in Docker, this is the container ID / container name)
        const hostname = os.hostname()

        // Log để dễ debug khi xem log container (EN: log for easier container log debugging)
        this.logger.log(`Request được xử lý bởi: ${hostname} (EN: Request handled by: ${hostname})`)

        return {
            status: "ok",
            servedBy: hostname,
            timestamp: new Date().toISOString(),
        }
    }
}
