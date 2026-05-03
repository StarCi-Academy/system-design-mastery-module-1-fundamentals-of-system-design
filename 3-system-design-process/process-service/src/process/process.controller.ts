import {
    Controller, Get, Query
} from "@nestjs/common"
import {
    ProcessService
} from "./process.service"

@Controller("process")
export class ProcessController {
    constructor(private readonly processService: ProcessService) { }

    @Get("1-clarify")
    clarify(@Query("name") name: string = "Ticket Booking System") {
        return this.processService.clarify(name)
    }

    @Get("2-estimate")
    estimate(@Query("dau") dau: string = "1000000") {
        return this.processService.estimate(parseInt(dau))
    }

    @Get("3-design")
    design() {
        return this.processService.getHighLevelDesign()
    }

    @Get("4-deep-dive")
    deepDive() {
        return this.processService.deepDive()
    }
}
