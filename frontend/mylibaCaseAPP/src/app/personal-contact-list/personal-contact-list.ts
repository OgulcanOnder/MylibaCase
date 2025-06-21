import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Personal {
  id?:string;
  name: string;
  surname: string;
  email: string;
}
@Component({
  selector: 'app-personal-contact-list',
  imports: [CommonModule],
  templateUrl: './personal-contact-list.html',
  styleUrl: './personal-contact-list.css',
  standalone:true
})
export class PersonalContactList {
@Input() personalList: Personal[] = [];
  @Output() personalToEdit = new EventEmitter<Personal>();
  @Output() personalToDelete = new EventEmitter<string>();

  editPersonal(personal:Personal) {
    this.personalToEdit.emit(personal);    
  }

  deletePersonal(personalId:string) {
    this.personalToDelete.emit(personalId);
  }
}
