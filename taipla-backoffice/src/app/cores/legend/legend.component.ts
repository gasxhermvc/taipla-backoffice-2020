import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnInit,
  ViewRef,
} from "@angular/core";
import { BaseClass } from "@app/based/classes/base-class";
import { ControlType, FormConfig } from "@app/based/interfaces/FormConfig";

@Component({
  selector: "app-legend",
  templateUrl: "./legend.component.html",
  styleUrls: ["./legend.component.scss"],
})
export class LegendComponent extends BaseClass implements OnInit {
  formConfig: FormConfig[] = [
    {
      key: "ID",
      invisible: true,
    },
    {
      key: "LEGEND_TYPE",
      label: "ประเภทตำนาน",
      type: ControlType.select,
      placeholder: "ประเภทตำนาน",
      lookup: this.backoffice.getLookup("LEGEND-TYPES"),
      errorMessages: {
        required: "เลือกประเภทตำนาน",
      },
    },
    {
      key: "DESCRIPTION",
      label: "คำอธิบาย",
      type: ControlType.textarea,
      placeholder: "คำอธิบาย",
    },
    {
      key: "CODE",
      invisible: true,
    },
    {
      key: "THUMBNAIL",
      label: "รูปภาพตำนาน",
      type: ControlType.upload,
      placeholder: "เลือกรูปภาพตำนาน",
      allowFileType: "image/jpeg,image/jpg,image/png",
      multiple: true,
      limit: 5,
      size: 10485760,
      preview: false,
      listType: "picture-card",
      errorMessages: {
        uploadFormat: "รองรับเฉพาะ JPG, JPEG และ PNG",
        uploadSize: "รองรับขนาดไฟล์ไม่เกิน 10 MB",
        uploadLimit: "อัพโหลดได้ไม่เกิน 5 รูปภาพ",
      },
    },
  ];

  @Input()
  multiple: boolean = false;

  @Input()
  limit: number = 3;

  @Input("data")
  values: any;

  get isMultiple() {
    return this.multiple;
  }

  get isLimit() {
    let limit = this.limit || 3;
    let length = this.values ? this.values.length : 0;
    return length >= limit;
  }

  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    super(injector);
    (window as any).legend = this;
  }

  ngOnInit(): void {}

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  isLastest(index: number, len: number) {
    return index < len - 1;
  }
}
