import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormGroupName, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-reactive',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  http = inject(HttpClient);
  isLoading: boolean = false;
  isSideFormVisible: boolean = false;
  isSaveButtonVisible: boolean = true;
  isUpdateButtonVisible: boolean = false;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(0),
    userName: new FormControl('',[Validators.required,Validators.minLength(5)]),
    emailId: new FormControl('',[Validators.required,Validators.email]),
    fullName: new FormControl('',[Validators.required]),
    role: new FormControl(''),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    createdDate: new FormControl(new Date()),
    projectName: new FormControl(''),
    refreshToken: new FormControl(''),
    refreshTokenExpiryTime: new FormControl(new Date()),


  });
  
  userList: any[] = [];
  constructor() {
    this.getUsers();
  }
  getUsers() {
    this.isLoading = true;
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetAllUsers').subscribe((response: any) => {
      console.log(response);
      if (response.result) {
        this.userList = response.data;
        this.isLoading = false;
      } else {
        alert(response.message);
      }
    })
  }

  toggleSideForm() {
    this.isSideFormVisible = !this.isSideFormVisible
  };
  onSaveUser() { 
    const formValue = this.userForm.value;
    this.http.post('https://projectapi.gerasim.in/api/Complaint/addnewuser', formValue).subscribe((response: any) => {
      if(response.result){
        this.getUsers();
      } else{
        alert(response.message);
      }      
    })
  };
  onUpdteUser() {
    const formValue = this.userForm.value;
    this.http.post('https://projectapi.gerasim.in/api/Complaint/UpdateUser', formValue).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
    })
   };
  editUser(data: any) {
    this.isSideFormVisible = true;
    this.isSaveButtonVisible = false;
    this.isUpdateButtonVisible = true;
    this.userForm.patchValue(data);

   };
  OndeleteUser(index: number) {
    this.http.delete('https://projectapi.gerasim.in/api/Complaint/DeleteUserByUserId?userId=' + index).subscribe((response: any) => {
      console.log(response);
      this.getUsers();
    })
   };

}