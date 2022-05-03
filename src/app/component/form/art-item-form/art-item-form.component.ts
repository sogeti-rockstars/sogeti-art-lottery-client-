import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-art-item-form',
  templateUrl: './art-item-form.component.html',
  styleUrls: ['./art-item-form.component.css']
})
export class ArtItemFormComponent {
  profileForm = this.fb.group({
    itemName: ['', Validators.required],
    pictureUrl: [''],
    artistName: [''],
    size: [''],
    frameDescription: [''],
    value: [''],
    technique: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases(){
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  updateProfile(){
    this.profileForm.patchValue({
      itemName: 'item test',
      artistName: 'artist test'
    })
  }

  addAlias(){
    this.aliases.push(this.fb.control(''));
  }

  onSubmit(){
    console.warn(this.profileForm.value);
  }


}
