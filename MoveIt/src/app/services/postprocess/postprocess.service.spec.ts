import { TestBed } from '@angular/core/testing';

import { PostprocessService } from './postprocess.service';

describe('PostprocessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostprocessService = TestBed.get(PostprocessService);
    expect(service).toBeTruthy();
  });
});
