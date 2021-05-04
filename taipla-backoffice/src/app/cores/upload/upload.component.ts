import { Component, Input, OnInit } from "@angular/core";
import { AppService } from "@app/based/services/app.service";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  loading: boolean;

  @Input("fileLists")
  FILE_LISTS: NzUploadFile[] = [];
  @Input("limit")
  LIMITS: number = 20;
  @Input("multiple")
  MULTIPLE: boolean = true;
  @Input("meta")
  MEATA: any;

  @Input('imageFileType')
  IMG_FILE_TYPE: string = "image/jpeg|image/jpg|image/png";

  private MAX_FILE_SIZE: number = 20 * 1024 * 1024;

  previewImage: string | undefined = "";

  previewVisible = false;

  constructor(private app: AppService) {
    (window as any).upload = this;
  }

  ngOnInit(): void {}

  beforeUpload = (file: NzUploadFile) => {
    this.loading = true;

    return new Observable((observer: Observer<any>) => {
      let fileType = this.IMG_FILE_TYPE.toLowerCase().split("|");

      let allowFileType =
        fileType.filter(
          (type: any) =>
            file.type.toLowerCase().indexOf(type.toLowerCase()) !== -1
        ).length > 0;

      if (!allowFileType) {
        this.app.showError(this.app.message.INPUT.VALIDATOR.UPLOAD_FORMAT);
        observer.next(false);
        observer.complete();
      }

      let allowFileSize = file.size < this.MAX_FILE_SIZE;
      if (!allowFileSize) {
        this.app.showError(this.app.message.INPUT.VALIDATOR.UPLOAD_SIZE);
        observer.next(false);
        observer.complete();
      }

      let limitFiles = (this.FILE_LISTS.length + 1) > this.LIMITS;
      if (limitFiles) {
        this.app.showError(`อัพโหลดได้ไม่เกิน ${this.LIMITS} รูปภาพ`);
        observer.next(false);
        observer.complete();
      }
      observer.next(true);
      observer.complete();
    });
  };

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  handleUpload = (item: any) => {
    let param: any = this.getFormData({
      ...(this.MEATA ? { ...this.MEATA } : {}),
      UPLOAD: [item.file],
    });
    this.app
      .reqUrl(
        `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.MEDIA.UPLOAD}`,
        {
          method: "POST",
          headers: this.app.headerFormData,
          parameters: this.app.formData(param),
        }
      )
      .subscribe((response: any) => {
        if (response.success) {
          this.FILE_LISTS = [
            ...this.FILE_LISTS.filter(
              (_item: any) => _item.uid !== item.file.uid
            ),
          ].concat(...response.data);
        } else {
          item.status = "error";
        }
      });
  };

  handleRemove = (item: any) => {
    let param: any = this.getFormData({
      ...(this.MEATA ? { ...this.MEATA } : {}),
      UID: item.uid,
      PATH_FILE: item.url,
    });
    this.app
      .reqUrl(
        `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.MEDIA.REMOVE}/${item.uid}`,
        {
          method: "DELETE",
          headers: this.app.header,
          parameters: param,
        }
      )
      .subscribe((response: any) => {
        if (response.success) {
          this.FILE_LISTS = [].concat(
            ...this.FILE_LISTS.filter(
              (_item: any) => _item.uid !== response.data.UID
            )
          );
        } else {
          item.status = "error";
        }
      });
  };

  getFormData(parameter: any = {}, allowNull: boolean = false) {
    let data = { ...parameter };
    if (!allowNull) {
      Object.keys(data).forEach((key) => {
        if (
          data[key] === null ||
          data[key] == "null" ||
          data[key] === undefined
        ) {
          data[key] = "";
        }
      });
    }
    return data;
  }
}
