import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonalForm } from './personal-form/personal-form';
import { PersonalContactList } from './personal-contact-list/personal-contact-list';
import { CommonModule } from '@angular/common';
import { PersonalService } from './personal-service';
import { EMPTY, Observable,of } from 'rxjs';
import { catchError,tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface Personal{
  id?:string;
  name:string;
  surname:string;
  email:string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,PersonalForm,PersonalContactList],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App implements OnInit {
  protected title = 'mylibaCaseAPP';
   personalContacts: Personal[] = [];
   editingPersonal: Personal | null = null; // Düzenlenmek üzere seçilen kişiyi tutar
   errorMessage: string | null=null; // Hata Mesajlarını Kullanıcıya Göstermek İçin
   successMessage:string| null=null; // Başarı Mesajlarını Kullanıcıya Göstermek İçin

   constructor(private personalService: PersonalService) { }

   ngOnInit(): void {
     this.fetchPersonalContacts();
   }

    fetchPersonalContacts(): void {
    this.personalService.getPersonals().pipe(
      tap(data => {
        this.personalContacts = data;          
      }),
      catchError(error => {        
        this.errorMessage = 'Kişiler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.';
        return EMPTY; 
      })
    ).subscribe(); 
  }
   

  onPersonalAdded(personal: Personal) {
    this.clearMessages();
    this.personalService.addPersonal(personal).pipe(
      tap(responsePersonal => {
        // API'den dönen ID'li kişi objesini listeye ekle
        this.personalContacts.push(responsePersonal);
        this.editingPersonal = null; 
        this.successMessage = "Kişi Başarıyla Eklendi";   
      }),
      catchError((error:HttpErrorResponse) => {        
        if(error.status===400 && error.error && typeof error.error==="object"){
          this.errorMessage="Kişi eklenirken bir hata oluştu. Lütfen bilgileri kontrol edin.";
        }else{
          this.errorMessage = 'Bu E-mail Adresi Zaten Kayıtlıdır.';
        }        
        return EMPTY;
      })
    ).subscribe();
  }

  onPersonalUpdated(data: { updatedPersonal: Personal; originalId?: string }): void {    
    this.clearMessages();
    const { updatedPersonal, originalId } = data;
    const personalIdToUpdate = originalId || updatedPersonal.id; // Güncelleme için ID'yi al

    if (!personalIdToUpdate) {      
      this.errorMessage = 'Güncelleme işlemi için kişi bilgisi eksik.';
      return;
    }

    this.personalService.updatePersonal(personalIdToUpdate, updatedPersonal).pipe(
      tap(responsePersonal => {
        // Listeyi güncelle: Mevcut kişiyi API'den gelen güncel veriyle değiştir
        const index = this.personalContacts.findIndex(p => p.id === personalIdToUpdate);
        if (index !== -1) {
          this.personalContacts[index] = responsePersonal;
        }
        this.editingPersonal = null; // Güncelleme bittikten sonra düzenleme modunu kapat
        this.successMessage = "Kişi Başarıyla Güncellendi";      
        this.fetchPersonalContacts();
      }),
      catchError((error:HttpErrorResponse) => {        
        console.error("API Hatası:",error);
        if(error.status===400 && error.error && typeof error.error==="object"){
          this.errorMessage="Kişi eklenirken bir hata oluştu. Lütfen bilgileri kontrol edin.";
        }else{
          this.errorMessage = 'Bu E-Mail Adresi Zaten Kayıtlıdır.';
        }        
        return EMPTY;
      })
    ).subscribe();
  }

  onPersonalDelete(personalId:string): void {    

    if (!personalId) {      
      this.errorMessage = 'Silme işlemi için kişi bilgisi eksik.';
      return;
    }

    if (confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
      this.personalService.deletePersonal(personalId).pipe(
        tap(() => {          
          this.editingPersonal = null; // Bir kişi silinirse düzenleme modunu kapat          
          this.fetchPersonalContacts();
          this.successMessage="Kişi Silinmiştir.";
        }),
        catchError(error => {          
          this.errorMessage = 'Kişi silinirken bir hata oluştu.';
          return EMPTY;
        })
      ).subscribe();
    }
  }

  onPersonalEdit(personal: Personal): void {
    this.editingPersonal ={...personal}; // Düzenlenecek kişiyi form component'e gönderilecek şekilde ayarla    
  }
  private clearMessages():void{
    this.errorMessage=null;
    this.successMessage=null;
  }
}
