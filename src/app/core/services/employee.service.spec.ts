import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[EmployeeService, provideHttpClient(), provideHttpClientTesting()]});
    service = TestBed.inject(EmployeeService); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('gets employees', () => {
    service.getAll().subscribe(v => expect(v.length).toBe(1));
    http.expectOne(req => req.method === 'GET').flush([{id:'1',name:'A',email:'a@a.com',mobile:'1234567890',country:'India',state:'Telangana',district:'Rangareddy'}]);
  });
});