import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/based/services/app.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @ViewChild('image', { static: false }) image: Element;

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

  imageDefault: any;

  constructor(private app: AppService) { }

  ngOnInit(): void {
    switch (this.imageType) {
      case "avatar":
        this.imageDefault = "assets/images/defaults/avatar.png";
        break;
      case "image":
        this.imageDefault = "assets/images/defaults/image.png";
        break;
    }

    let contentType = '';

    if (this.src && this.src !== '') {
      if (this.src.indexOf('.png') !== -1 || this.src.indexOf('.PNG') !== -1) {
        contentType = 'image/png';
      } else if ((this.src.indexOf('.jpg') !== -1 || this.src.indexOf('.jpeg') !== -1) ||
        (this.src.indexOf('.JPG') !== -1 || this.src.indexOf('.JPEG') !== -1)) {
        contentType = 'image/jpeg';
      } else if (this.src.indexOf('.gif') !== -1 || this.src.indexOf('.GIF') !== -1) {
        contentType = 'image/gif';
      } else if (this.src.indexOf('.svg') !== -1 || this.src.indexOf('.SVG') !== -1) {
        contentType = 'image/svg';
      }
    }

    this.app.reqUrl(this.src, {
      method: 'GET',
      headers: {
        'content-type': contentType
      },
      parameters: {}
    }, false).subscribe((response: any) => {
      // console.log('image', image);
      console.log(this.image)
    }, (error: any) => {
      console.log('image', error);
    });
  }

  ngAfterViewInit() {
    this.loaded = true;
  }

  onImageLoaded(evt) {
    console.log('loaded', evt);
    // evt.target.src = this.src;
  }

  onImageChange(evt) {
    console.log('change', evt);
  }
  onImageError(evt) {
    evt.target.src = this.imageDefault;
  }
}
