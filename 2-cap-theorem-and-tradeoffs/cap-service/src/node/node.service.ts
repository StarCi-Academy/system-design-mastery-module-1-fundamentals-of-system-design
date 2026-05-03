import {
    Injectable, Logger, HttpException, HttpStatus
} from "@nestjs/common"
import {
    HttpService
} from "@nestjs/axios"
import {
    firstValueFrom
} from "rxjs"
import * as os from "os"

@Injectable()
export class NodeService {
    private readonly logger = new Logger(NodeService.name)
    private balance = 1000 // Khởi tạo 1000$ (EN: Initial 1000$)
    private readonly mode: string
    private readonly nodeName: string
    private readonly peers: string[]

    constructor(private readonly httpService: HttpService) {
        this.mode = process.env.MODE || "CP" // Mặc định là CP (EN: Default is CP)
        this.nodeName = process.env.NODE_NAME || os.hostname() // Tên node (EN: Node name)
        this.peers = process.env.PEERS ? process.env.PEERS.split(",") : []
        this.logger.log(`Node [${this.nodeName}] started in ${this.mode} mode`)
    }

    /**
     * Lấy số dư hiện tại
     * (EN: Get current balance)
     */
    getBalance() {
        return {
            balance: this.balance,
            nodeName: this.nodeName,
            servedBy: os.hostname(),
            mode: this.mode,
            timestamp: new Date().toISOString()
        }
    }

    /**
     * Thực hiện chuyển tiền và đồng bộ
     * (EN: Perform transfer and synchronization)
     */
    async transfer(amount: number) {
        const start = Date.now()
        this.logger.log(`Processing transfer: ${amount}`)

        if (this.mode === "CP") {
            // Trong chế độ CP: Bắt buộc phải đồng bộ thành công mới ghi local
            // (EN: CP Mode: Must sync successfully before local write)
            try {
                await this.syncToPeers(amount)
                this.balance += amount
                return {
                    status: "success",
                    message: "Consistency guaranteed (CP)",
                    newBalance: this.balance,
                    duration: `${Date.now() - start}ms`
                }
            } catch (error) {
                this.logger.error(`Sync failed in CP mode: ${error.message}`)
                throw new HttpException(
                    "Network Partition Detected: Cannot guarantee consistency. Transaction aborted to protect data.",
                    HttpStatus.SERVICE_UNAVAILABLE
                )
            }
        } else {
            // Trong chế độ AP: Ghi local ngay lập tức, đồng bộ sau (Eventual Consistency)
            // (EN: AP Mode: Write local immediately, sync later)
            this.balance += amount
            this.syncToPeers(amount).catch(err => {
                this.logger.warn(`Background sync failed in AP mode (Expected during partition): ${err.message}`)
            })

            return {
                status: "success",
                message: "Availability prioritized (AP). Data may be inconsistent temporarily.",
                newBalance: this.balance,
                duration: `${Date.now() - start}ms`
            }
        }
    }

    /**
     * Đồng bộ dữ liệu sang các node khác
     * (EN: Sync data to other nodes)
     */
    private async syncToPeers(amount: number) {
        const syncPromises = this.peers.map(peer => {
            return firstValueFrom(
                this.httpService.post(`${peer}/internal/sync`, { amount }, { timeout: 2000 })
            )
        })
        await Promise.all(syncPromises)
    }

    /**
     * Áp dụng dữ liệu đồng bộ từ node khác
     * (EN: Apply synced data from another node)
     */
    applySync(amount: number) {
        this.balance += amount
        this.logger.log(`Applied sync from peer: +${amount}. New balance: ${this.balance}`)
        return { status: "synced" }
    }
}
