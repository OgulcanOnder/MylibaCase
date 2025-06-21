import { Component, EventEmitter, Input, Output,OnChanges,SimpleChange } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Personal{
  id?:string;
  name:string;
  surname:string;
  email:string;
}
@Component({
  selector: 'app-personal-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './personal-form.html',
  styleUrl: './personal-form.css',
  standalone:true,  
})
export class PersonalForm {
form:FormGroup;
isEditing:boolean=false;
private currentEditingPersonal: Personal | null=null
@Input() set personalToEdit(personal:Personal | null){
  if(personal){
    this.currentEditingPersonal=personal;
    this.form.patchValue({
      name:personal.name,
      surname:personal.surname,
      email:personal.email
    });
    this.isEditing=true
  } else{
    this.resetForm();
  }
}

  @Output() personalAdded = new EventEmitter<{ name: string; surname: string; email: string }>();
  @Output() personalUpdated = new EventEmitter<{ updatedPersonal: Personal; originalId?: string }>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zçğıöşüA-ZÇĞİÖŞÜ'-]{2,50}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zçğıöşüA-ZÇĞİÖŞÜ'-]{2,50}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
   addOrUpdatePersonal() {
    this.form.markAllAsTouched(); // Tüm alanları kirli olarak işaretle ki hata mesajları görünsün

    if (this.form.valid) {
      const { name, surname, email } = this.form.value;
      const newOrUpdatedPersonal: Personal = { name, surname, email };

      if (this.isEditing) {
        // Eğer ID varsa, güncelleyeceği objeye ID'yi de ekle
        if (this.currentEditingPersonal?.id) {
          newOrUpdatedPersonal.id = this.currentEditingPersonal.id;
        }
        this.personalUpdated.emit({
          updatedPersonal: newOrUpdatedPersonal,
          originalId: this.currentEditingPersonal?.id
        });
        console.log('PersonalFormComponent: Veri güncellendi:', newOrUpdatedPersonal);
      } else {       
        
        this.personalAdded.emit(newOrUpdatedPersonal);
        console.log('PersonalFormComponent: Veri eklendi:', newOrUpdatedPersonal);
      }
      this.resetForm();
    } else {
      console.log('Form geçerli değil. Lütfen hataları düzeltin.');
    }
  }

  resetForm() {
    this.form.reset();
    this.isEditing = false;
    this.currentEditingPersonal = null;
    this.form.markAsUntouched(); // Tüm alanları dokunulmamış olarak işaretle
    this.form.markAsPristine(); // Tüm alanları pristine olarak işaretle
  }   
}
