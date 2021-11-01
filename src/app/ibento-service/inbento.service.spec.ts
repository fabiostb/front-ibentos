import {IbentoService} from './ibento.service';
import {Ibento} from './ibento';
import {of} from 'rxjs';
import {IbentoList} from './ibento-list';

let httpClientSpy: { get: jasmine.Spy };

let service: IbentoService;

describe('Service: Ibento', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new IbentoService(httpClientSpy as any);
  });

  it('should returns list of ibentos', () => {
    const list: IbentoList[] = [
      new IbentoList(new Ibento(), 1),
      new IbentoList(new Ibento(), 2)
    ];

    httpClientSpy.get.and.returnValue(of<IbentoList[]>(list));

    service.getIbentos().subscribe(items => expect(items).toEqual(list));
  });
});
