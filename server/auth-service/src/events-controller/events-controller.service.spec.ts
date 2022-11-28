import { Test, TestingModule } from '@nestjs/testing'
import { EventsControllerService } from './events-controller.service'

describe('EventsControllerService', () => {
    let service: EventsControllerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventsControllerService],
        }).compile()

        service = module.get<EventsControllerService>(EventsControllerService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
