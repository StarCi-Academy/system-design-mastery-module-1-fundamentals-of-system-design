import {
    Controller, Get, Post, Body, HttpException, HttpStatus 
} from "@nestjs/common"
import {
    NodeService 
} from "./node.service"

@Controller()
export class NodeController {
    constructor(private readonly nodeService: NodeService) { }

    /**
     * POST /transfer — Thực hiện chuyển tiền (Ghi dữ liệu)
     * (EN: POST /transfer — Perform money transfer (Write data))
     */
    @Post("transfer")
    async transfer(@Body("amount") amount: string) {
        const val = parseInt(amount)
        if (isNaN(val)) {
            throw new HttpException("Invalid amount", HttpStatus.BAD_REQUEST)
        }
        return await this.nodeService.transfer(val)
    }

    /**
     * GET /balance — Truy vấn số dư (Đọc dữ liệu)
     * (EN: GET /balance — Query balance (Read data))
     */
    @Get("balance")
    getBalance() {
        return this.nodeService.getBalance()
    }

    /**
     * POST /sync — Endpoint nội bộ để đồng bộ dữ liệu giữa các node
     * (EN: POST /sync — Internal endpoint to sync data between nodes)
     */
    @Post("internal/sync")
    sync(@Body("amount") amount: number) {
        return this.nodeService.applySync(amount)
    }
}
