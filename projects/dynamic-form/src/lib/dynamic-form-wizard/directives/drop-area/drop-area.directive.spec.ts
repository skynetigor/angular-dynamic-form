import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

import { DropAreaDirective } from './drop-area.directive';

@Component({
  selector: 'pxl-test',
  template: '<div dropArea (dropFiles)="dropFiles($event)" (dropItems)="dropItems($event)" ><div>'
})
class TestComponent {
  @ViewChild(DropAreaDirective)
  directive: DropAreaDirective;

  dropFiles = jasmine.createSpy('dropFiles');
  dropItems = jasmine.createSpy('dropItems');
}

describe('DropAreaDirective', () => {
  let component: TestComponent;
  let divElement: HTMLDivElement;
  let fixture: ComponentFixture<TestComponent>;

  configureTestSuite();

  beforeAll(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DropAreaDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    component = fixture.componentInstance;
  });

  it('should be able to create directive instance', () => {
    expect(component).toBeTruthy();
  });

  describe('dragenter, dragover, dragleave and drop events', () => {
    it('should call preventDefault and stopPropagation', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        const event = new Event(eventName);
        const preventDefaultSpy = spyOn(event, 'preventDefault');
        const stopPropagationSpy = spyOn(event, 'stopPropagation');

        divElement.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(stopPropagationSpy).toHaveBeenCalled();
      });
    });
  });

  describe('drop event', () => {
    it('should emit dropFiles event', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      component.directive.isFilesOver = true;
      const files: any = [{}];
      const items: any = [];
      const event = new DragEvent('drop') as any;

      spyOnProperty(event, 'dataTransfer').and.returnValue({
        files,
        items
      });

      divElement.dispatchEvent(event);

      expect(component.dropFiles).toHaveBeenCalled();
      expect(component.directive.isFilesOver).toBeFalsy();
    });

    it('should emit dropItems event', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      component.directive.isFilesOver = true;
      const items: any = [{}];
      const files: any = [];
      const event = new DragEvent('drop') as any;

      spyOnProperty(event, 'dataTransfer').and.returnValue({
        files,
        items
      });

      divElement.dispatchEvent(event);

      expect(component.dropItems).toHaveBeenCalled();
      expect(component.directive.isFilesOver).toBeFalsy();
    });
  });

  describe('dragenter event', () => {
    it('should set isFilesOver to true', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const event = new DragEvent('dragenter');

      divElement.dispatchEvent(event);

      expect(component.directive.isFilesOver).toBeTruthy();
    });
  });

  describe('dragleave event', () => {
    it('should set isFilesOver to false', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const event = new DragEvent('dragleave');

      divElement.dispatchEvent(event);

      expect(component.directive.isFilesOver).toBeFalsy();
    });
  });
});
