import {
    Injectable,
    Logger,
} from "@nestjs/common"
import * as os from "os"

/**
 * Service xử lý trạng thái.
 * (EN: Status handling service.)
 */
@Injectable()
export class StatusService {
    private readonly logger = new Logger(StatusService.name)

    /**
     * Lấy hostname của hệ điều hành hiện tại (container).
     * (EN: Gets current OS hostname (container).)
     */
    getStatus() {
        // Lấy hostname từ Node.js os module.
        // (EN: Get hostname from Node.js os module.)
        const hostname = os.hostname()

        this.logger.log(`Request được xử lý bởi: ${hostname} (EN: Request handled by: ${hostname})`)

        return {
            status: "ok",
            servedBy: hostname,
            timestamp: new Date().toISOString(),
        }
    }
}
