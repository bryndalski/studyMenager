import { Test, TestingModule } from '@nestjs/testing'
import { EventsControllerController } from './events-controller.controller'

describe('EventsControllerController', () => {
    let controller: EventsControllerController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsControllerController],
        }).compile()

        controller = module.get<EventsControllerController>(
            EventsControllerController
        )
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
