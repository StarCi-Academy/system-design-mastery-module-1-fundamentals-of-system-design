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
 * Khởi tạo ứng dụng NestJS cho bài Scaling Strategies
 * (EN: Bootstrap NestJS application for Scaling Strategies lesson)
 */
async function bootstrap() {
    const logger = new Logger("Bootstrap")
    const app = await NestFactory.create(AppModule)

    // Lắng nghe trên port 3000 (EN: listen on port 3000)
    await app.listen(3000)
    logger.log(`Scaling Service is running on: ${await app.getUrl()}`)
}
bootstrap()
