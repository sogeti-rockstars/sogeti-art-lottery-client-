import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
  @Input() modalHeader!: string;
  @Input() modalBody!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log('omg')
  }

  close(event:any){
    this.closeModal.emit(event);
  }

}
