import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordingComponent } from './attendance-recording.component';

describe('AttendanceRecordingComponent', () => {
  let component: AttendanceRecordingComponent;
  let fixture: ComponentFixture<AttendanceRecordingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceRecordingComponent]
    });
    fixture = TestBed.createComponent(AttendanceRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
