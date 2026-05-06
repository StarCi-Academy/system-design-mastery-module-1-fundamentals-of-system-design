import {
    Module,
} from "@nestjs/common"
import {
    NodeModule,
} from "./node"

/**
 * Module gốc — Quản lý dependencies chung.
 * (EN: Root module — Manages global dependencies.)
 */
@Module({
    imports: [
        // Module Node — xử lý logic CAP
        // (EN: Node module — handles CAP logic)
        NodeModule,
    ],
})
export class AppModule { }
