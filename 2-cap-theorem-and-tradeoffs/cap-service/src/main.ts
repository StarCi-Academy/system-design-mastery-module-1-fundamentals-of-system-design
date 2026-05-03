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
 * Khởi tạo ứng dụng NestJS cho bài CAP Theorem
 * (EN: Bootstrap NestJS application for CAP Theorem lesson)
 */
async function bootstrap() {
    const logger = new Logger("Bootstrap")
    const app = await NestFactory.create(AppModule)
    
    // Enable CORS for testing
    app.enableCors()
    
    const port = process.env.PORT || 3000
    await app.listen(port)
    logger.log(`CAP Service Node is running on port: ${port}`)
}
bootstrap()
