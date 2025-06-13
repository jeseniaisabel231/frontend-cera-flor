import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  imports: [ImageCropperComponent],
  selector: 'app-image-cropper',
  template: `
    <image-cropper
      [imageChangedEvent]="imageChangedEvent"
      [maintainAspectRatio]="true"
      
      format="png"
      (imageCropped)="imageCropped($event)"
      (imageLoaded)="imageLoaded($event)"
      (cropperReady)="cropperReady()"
      (loadImageFailed)="loadImageFailed()"
    ></image-cropper>
  `,
})
export class ImageComponent {
  imageChangedEvent: Event | null=null;
  croppedImage: SafeUrl="";
  //[aspectRatio]="aspectRatio()"

  aspectRatioValue: number = 1;
  private sanitizer = inject(DomSanitizer);
  constructor() {
  }

  fileChangedEvent(event: Event): void {
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl?? '');
  }
  imageLoaded(image:LoadedImage) {
    // Image loaded
  }
  cropperReady() {
    // Cropper ready
  }
  loadImageFailed() {
    // Load failed
  }

}

