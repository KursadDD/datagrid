import { TestBed } from '@angular/core/testing';

import { DatagridServiceService } from './datagrid-service.service';

describe('DatagridServiceService', () => {
  let service: DatagridServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagridServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
