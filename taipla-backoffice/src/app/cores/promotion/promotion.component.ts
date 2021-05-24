import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewRef,
} from "@angular/core";
import { BaseClass } from "@app/based/classes/base-class";
import { ControlType, FormConfig } from "@app/based/interfaces/FormConfig";

@Component({
  selector: "app-promotion",
  templateUrl: "./promotion.component.html",
  styleUrls: ["./promotion.component.scss"],
})
export class PromotionComponent extends BaseClass implements OnInit {
  formConfig: FormConfig[] = [
    {
      key: "PROMOTION_ID",
      invisible: true,
    },
    {
      key: "RES_ID",
      invisible: true,
    },
    {
      key: "PROMOTION_TYPE",
      label: "ประเภทโปรโมชัน",
      type: ControlType.select,
      placeholder: "ประเภทโปรโมชัน",
      lookup: this.backoffice.getLookup("PROMOTION-TYPES"),
      errorMessages: {
        required: "เลือกประเภทโปรโมชัน",
      },
    },
    {
      key: "DESCRIPTION",
      label: "คำอธิบาย",
      type: ControlType.textarea,
      placeholder: "คำอธิบาย",
    },
    {
      key: "DATE_RANGE",
      label: 'ระยะเวลาโปรโมชัน',
      type: ControlType.daterange,
      placeholder: ["เลือกเวลาเริ่มต้น", "เลือกเวลาสิ้นสุด"],
      change: (date: any) => {
        console.log(date);
      }
    },
    {
      key: "UPLOAD",
      label: "รูปภาพโปรโมชัน",
      type: ControlType.upload,
      placeholder: "เลือกรูปภาพโปรโมชัน",
      allowFileType: "image/jpeg,image/jpg,image/png",
      multiple: false,
      limit: 1,
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

  @Output() remove = new EventEmitter<any>();

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

  get hasValue() {
    return this.form && this.form.getFormData()["PROMOTION_ID"];
  }

  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    super(injector);
    (window as any).promotion = this;
  }

  ngOnInit(): void { }

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  isLastest(index: number, len: number) {
    return index < len - 1;
  }

  removePromotion(evt: any) {
    evt.stopPropagation && evt.stopPropagation();
    evt.preventDefault && evt.preventDefault();

    this.remove.emit(this.form.getFormData());
  }
}
