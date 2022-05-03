import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lottery-participant',
  templateUrl: './lottery-participant.component.html',
  styleUrls: ['./lottery-participant.component.css']
})
export class LotteryParticipantComponent {
  participantForm = new FormGroup({
    name: new FormControl(''),
    office: new FormControl('')
  });

  onSubmit(){
    console.warn(this.participantForm.value)
  }
}
