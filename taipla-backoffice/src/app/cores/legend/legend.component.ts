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
import { et_EE } from "ng-zorro-antd/i18n";

@Component({
  selector: "app-legend",
  templateUrl: "./legend.component.html",
  styleUrls: ["./legend.component.scss"],
})
export class LegendComponent extends BaseClass implements OnInit {
  formConfig: FormConfig[] = [
    {
      key: "LEGEND_ID",
      invisible: true,
    },
    {
      key: "LEGEND_TYPE",
      label: "ประเภทตำนาน",
      type: ControlType.select,
      placeholder: "ประเภทตำนาน",
      disable: true,
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
      key: "UPLOAD",
      label: "รูปภาพตำนาน",
      type: ControlType.upload,
      placeholder: "เลือกรูปภาพตำนาน",
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
    return this.form && this.form.getFormData()["LEGEND_ID"];
  }

  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    super(injector);
    (window as any).legend = this;
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

  removeLegend(evt: any) {
    evt.stopPropagation && evt.stopPropagation();
    evt.preventDefault && evt.preventDefault();

    this.remove.emit(this.form.getFormData());
  }
}
