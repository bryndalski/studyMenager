import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { EventsControllerService } from './events-controller.service'
@Controller('events-controller')
export class EventsControllerController {
    constructor(private eventContraollerService: EventsControllerService) {}

    @MessagePattern({ cmd: 'hash_password' })
    async hashPassword({ password }: { password: string }): Promise<string> {
        return await this.eventContraollerService.generatePasswordHash(password)
    }
}
