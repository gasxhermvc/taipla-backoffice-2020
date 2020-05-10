//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { CategoryService } from '@backoffice/services/category.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      CategoryService
    ]
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
