import {
    NestFactory 
} from "@nestjs/core"
import {
    AppModule 
} from "./app.module"
import {
    Logger 
} from "@nestjs/common"

/**
 * Hàm khởi tạo ứng dụng NestJS
 * (EN: Bootstrap the NestJS application)
 *
 * Server lắng nghe trên port 3000, dùng cho mỗi API Node trong cụm Load Balancer
 * (EN: Server listens on port 3000, used for each API Node in the Load Balancer cluster)
 */
async function bootstrap() {
    const logger = new Logger("Bootstrap")

    // Tạo instance NestJS từ AppModule (EN: create NestJS instance from AppModule)
    const app = await NestFactory.create(AppModule)

    // Lắng nghe trên port 3000 — mỗi container sẽ expose port này
    // (EN: listen on port 3000 — each container exposes this port)
    await app.listen(3000)
    logger.log(`API Node is running on: ${await app.getUrl()}`)
}
bootstrap()
