import {
    Module 
} from "@nestjs/common"
import {
    StatusModule 
} from "./status/status.module"

@Module({
    imports: [
    // Import module xử lý endpoint /api/status (EN: import status endpoint module)
        StatusModule,
    ],
})
export class AppModule {}
