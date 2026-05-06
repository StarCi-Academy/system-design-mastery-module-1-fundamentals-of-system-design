import {
    Injectable,
    Logger,
} from "@nestjs/common"

/**
 * Service mô phỏng các bước trong Quy trình Thiết kế Hệ thống.
 * (EN: Service simulating steps in the System Design Process.)
 */
@Injectable()
export class ProcessService {
    private readonly logger = new Logger(ProcessService.name)

    /**
     * Bước 1: Làm rõ yêu cầu.
     * (EN: Step 1: Requirements Clarification.)
     */
    clarify(systemName: string) {
        this.logger.log(`Clarifying requirements for: ${systemName}`)
        return {
            step: "1. Requirements Clarification",
            functional: [
                `Core feature for ${systemName}`,
                "User authentication",
                "Real-time updates",
            ],
            nonFunctional: [
                "Scalability: Support 1M+ DAU",
                "High Availability: 99.99%",
                "Low Latency: < 200ms",
                "Consistency: Eventual consistency is okay for non-critical data",
            ],
        }
    }

    /**
     * Bước 2: Ước lượng quy mô.
     * (EN: Step 2: Back-of-the-envelope Estimation.)
     */
    estimate(dau: number) {
        this.logger.log(`Estimating scale for DAU: ${dau}`)
        // Giả định mỗi user thực hiện 20 requests/ngày (EN: Assume 20 requests/day per user)
        const requestsPerUser = 20
        const qps = Math.ceil((dau * requestsPerUser) / (24 * 3600))
        const peakQps = qps * 5
        // Giả định 0.5MB/user/day (EN: Assume 0.5MB/user/day)
        const storagePerDayGb = (dau * 0.5) / 1024

        return {
            step: "2. Back-of-the-envelope Estimation",
            input: {
                dau,
            },
            results: {
                averageQps: qps,
                peakQps: peakQps,
                storagePerDay: `${storagePerDayGb.toFixed(2)} GB`,
                storagePerYear: `${((storagePerDayGb * 365) / 1024).toFixed(2)} TB`,
            },
            conclusion:
                peakQps > 1000
                    ? "Recommendation: Horizontal Scaling + Load Balancer required"
                    : "Recommendation: Vertical Scaling might be enough",
        }
    }

    /**
     * Bước 3: Thiết kế cấp cao.
     * (EN: Step 3: High-Level Design.)
     */
    getHighLevelDesign() {
        this.logger.log("Generating High-Level Design")
        return {
            step: "3. High-Level Design",
            components: [
                "CDN / Route 53",
                "Load Balancer (Nginx/AWS ELB)",
                "API Gateway",
                "Microservices (Auth, Core, Notification)",
                "Distributed Cache (Redis)",
                "Database (PostgreSQL with Read Replicas)",
            ],
            diagram: `
graph TD
    Client((Clients)) --> LB[Load Balancer]
    LB --> App[API Nodes]
    App --> Redis[(Redis Cache)]
    App --> DB[(PostgreSQL)]
            `,
        }
    }

    /**
     * Bước 4: Tinh chỉnh chi tiết.
     * (EN: Step 4: Deep Dive & Bottlenecks.)
     */
    deepDive() {
        this.logger.log("Analyzing bottlenecks")
        return {
            step: "4. Deep Dive & Bottlenecks",
            issues: [
                {
                    component: "Database",
                    problem: "Write-heavy load causing contention",
                    solution: "Database Sharding or Write-ahead logging optimization",
                },
                {
                    component: "API Nodes",
                    problem: "Synchronous processing of heavy tasks",
                    solution: "Introduce Message Queue (RabbitMQ/Kafka) for Async processing",
                },
            ],
            expertTip: "Don't jump to Microservices too early. Start with Monolith if MVP.",
        }
    }
}
