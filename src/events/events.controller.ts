import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Crud({
  model: {
    type: Event,
  },
  query: {
    alwaysPaginate: true,
  },
})
@Controller('events')
export class EventsController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
