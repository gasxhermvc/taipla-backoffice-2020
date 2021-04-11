import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from '@app/based/services/app.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @ViewChild('image', { static: true, read: ElementRef }) image: ElementRef;

  url: any = `${window.location.protocol}//${window.location.host}/`;
  _loaded: boolean = false;
  set loaded(loaded: boolean) {
    setTimeout(() => {
      this._loaded = loaded;
    }, 0);
  }

  get loaded() {
    return this._loaded;
  }

  @Input() src: any;
  @Input() className: any;
  @Input() imageType: "avatar" | "image";
  @Input() draggable: boolean = false;

  imageDefault: any;



  constructor(private app: AppService) { }

  ngOnInit(): void {
    switch (this.imageType) {
      case "avatar":
        this.imageDefault = this.url + "assets/images/defaults/avatar.png";
        break;
      case "image":
        this.imageDefault = this.url + "assets/images/defaults/image.png";
        break;
    }



    if (!this.src || this.src === undefined || this.src === '') {
      this.src = this.imageDefault;
    }
    this.retriveImage(this.src);
  }

  private retriveImage(imageUrl: string) {
    this.loaded = false;
    let contentType = '';
    if (imageUrl.indexOf('.png') !== -1 || imageUrl.indexOf('.PNG') !== -1) {
      contentType = 'image/png';
    } else if ((imageUrl.indexOf('.jpg') !== -1 || imageUrl.indexOf('.jpeg') !== -1) ||
      (imageUrl.indexOf('.JPG') !== -1 || imageUrl.indexOf('.JPEG') !== -1)) {
      contentType = 'image/jpeg';
    } else if (imageUrl.indexOf('.gif') !== -1 || imageUrl.indexOf('.GIF') !== -1) {
      contentType = 'image/gif';
    } else if (imageUrl.indexOf('.svg') !== -1 || imageUrl.indexOf('.SVG') !== -1) {
      contentType = 'image/svg';
    }

    this.app.reqUrl(imageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': contentType
      },
      parameters: {},
      responseType: 'blob'
    }, false).subscribe({
      next: (response: any) => {
        if (response instanceof Blob) {
          this.image.nativeElement.src = window.URL.createObjectURL(response);
        } else {
          this.image.nativeElement.src = this.imageDefault;
        }
        this.loaded = true;
      },
      error: (error: any) => {
        this.retriveImage(this.imageDefault);
        this.loaded = true;
      }
    });
  }
}
