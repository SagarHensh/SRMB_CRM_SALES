import { TestBed } from '@angular/core/testing';

import { TaskmodalService } from './taskmodal.service';

describe('TaskmodalService', () => {
  let service: TaskmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
