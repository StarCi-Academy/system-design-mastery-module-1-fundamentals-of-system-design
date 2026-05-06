import {
    Module,
} from "@nestjs/common"
import {
    ProcessModule,
} from "./process"

/**
 * Module gốc — Quản lý dependencies chung.
 * (EN: Root module — Manages global dependencies.)
 */
@Module({
    imports: [
        // Module Process — xử lý các bước System Design
        // (EN: Process module — handles System Design steps)
        ProcessModule,
    ],
})
export class AppModule {}
