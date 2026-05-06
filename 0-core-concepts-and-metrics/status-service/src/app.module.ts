import {
    Module,
} from "@nestjs/common"
import {
    StatusModule,
} from "./status"

/**
 * Module gốc — Quản lý dependencies chung.
 * (EN: Root module — Manages global dependencies.)
 */
@Module({
    imports: [
        // Module trạng thái — xử lý API Node
        // (EN: Status module — handles API Node)
        StatusModule,
    ],
})
export class AppModule {}
