import {
    Injectable, Logger 
} from "@nestjs/common"
import * as os from "os"

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)

    /**
     * Giả lập một tác vụ tốn tài nguyên (CPU intensive)
     * (EN: Simulate a resource-intensive task (CPU intensive))
     */
    runHeavyCalculation(iterations: number) {
        const start = Date.now()

        // Vòng lặp tính toán để gây tải CPU (EN: Calculation loop to cause CPU load)
        let result = 0
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.atan(i)
        }

        const duration = Date.now() - start
        const hostname = os.hostname()

        this.logger.log(`[${hostname}] Heavy task completed in ${duration}ms`)

        return {
            servedBy: hostname,
            duration: `${duration}ms`,
            iterations,
            result: "completed"
        }
    }

    /**
     * Trả về thông tin node
     * (EN: Returns node information)
     */
    getStatus() {
        return {
            status: "ok",
            servedBy: os.hostname(),
            timestamp: new Date().toISOString()
        }
    }
}
