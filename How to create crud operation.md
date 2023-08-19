
(https://www.c-sharpcorner.com/blogs/angular-crud-operations)https://www.c-sharpcorner.com/blogs/angular-crud-operations

Introduction
In this blog, I am going to explain how to do a CRUD Operation in Angular using bootstrap and PrimeNG.

CRUD Meaning
CRUD is an acronym that comes from the world of computer programming and refers to the four functions that are considered necessary to implement a persistent storage application: create, read, update and delete.

------------------------------------------------------------------------------------
Step 1

Create Angular app using below command,

ng new <Angular App Name>
cd <Angular App Name>
code .   // to open code visual code 

-------------------------------------------------------------------------------------
 Step 2

Install bootstrap using the below command,

npm install bootstrap

and link bootstrap file in angular.json file,

"styles":
[
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
],
"scripts":
[
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]

--------------------------------------------------------------------------------------
Step 3

Install PrimeNg for third-party controls.

Reference: https://primefaces.org/primeng/showcase/#/setup

npm install primeng
npm install primeicons
npm install @angular/cdk

add CSS file in angular.json file,

"styles": [
   "node_modules/bootstrap/dist/css/bootstrap.min.css",
   "node_modules/primeng/resources/themes/saga-blue/theme.css",
   "node_modules/primeng/resources/primeng.min.css",
   "node_modules/primeicons/primeicons.css",
   "src/styles.scss"
 ],

------------------------------------------------------------------------------------------
 Step 4

Go to the app folder inside src and create the below files.

Components

Home
UserList
AddUser
NavBar
ng g c home
ng g c userList
ng g c addUser
ng g c navBar

Service

user Service
ng g s service/user
Model

User Model
ng g class User

---------------------------------------------------------------------------------------------------
 Step 5

Open User.ts file creates user Model.

user.ts

export interface User {
    id: number,
    name: string,
    email: string,
    mobile: string,
    gender: string,
    dob: Date,
    isActive: boolean,
    range?: any
    userType?: string
}

------------------------------------------------------------------------------------------------
 Step 6

Open user service files and create and create get-users,add-user, update-user, and remove-user methods.

user.service.ts

import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userList: User[] = [{
        id: 1,
        name: 'Ankit Sahu',
        dob: new Date('08/31/1992'),
        email: 'ankit@gmail.com',
        gender: 'Male',
        mobile: '8978786933',
        isActive: true,
        range: [0, 10],
        userType: 'Admin'
    }];
    constructor() {}
    getUsers() {
        return this.userList
    }
    getUsersByID(id: number) {
        return this.userList.find(x => x.id == id)
    }
    addUser(user: User) {
        user.id = new Date().getTime();
        this.userList.push(user);
    }
    updateUser(user: User) {
        const userIndex = this.userList.findIndex(x => x.id == user.id);
        if (userIndex != null && userIndex != undefined) {
            this.userList[userIndex] = user;
        }
    }
    removeUser(id: number) {
        this.userList = this.userList.filter(x => x.id != id);
    }
}

----------------------------------------------------------------------------------------------------------
Step 7

Open app Module and add required import modules.

app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddUserComponent,
    UserListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // BrowserAnimations Modules
    BrowserAnimationsModule,

    //  PrimeNG  Modules
    ButtonModule,
    TableModule,
    CalendarModule,
    SliderModule,

    //  Angular Form Modules
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

--------------------------------------------------------------------------------------------------------------------
Step 8

Open app-routing.module.ts and add respective routes.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user/:id', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

-------------------------------------------------------------------------------------------------
Step 9

open app.component.html and call navBar Component along with router-outlet.

<app-nav-bar></app-nav-bar>
<router-outlet></router-outlet>

-----------------------------------------------------------------------------------------------------
Step 10

Open the nav-bar.component.html file and create NavBar.

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" [routerLink]="['/']">Angular</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" routerLinkActive="active" [routerLink]="['/']"
                        [routerLinkActiveOptions]="{exact:
                            true}">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" routerLinkActive="active"
                        [routerLink]="['/user']">User</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

-------------------------------------------------------------------------------------------------------------------
Step 11

Open UserListComponent and get all users list from user service.

user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    userList: User[] = [];
    first = 0;
    rows = 10;
    constructor(private userService: UserService) {}
    ngOnInit(): void {
        // Get Users from UserService
        this.userList = this.userService.getUsers();
    }
    //****************PrimeNG DataTable Pagination method Start*********************** */
    //***************Reference: https://primefaces.org/primeng/showcase/#/table/page********** */
    next() {
        this.first = this.first + this.rows;
    }
    prev() {
        this.first = this.first - this.rows;
    }
    reset() {
        this.first = 0;
    }
    isLastPage(): boolean {
        return this.userList ? this.first === (this.userList.length - this.rows) : true;
    }
    isFirstPage(): boolean {
        return this.userList ? this.first === 0 : true;
    }
    //****************PrimeNG DataTable Pagination Method End*********************** */
    // ********************User To Remove User from User List*************************/
    remove(id: number) {
        this.userService.removeUser(id);
        this.userList = this.userService.getUsers();
    }
}
-----
user-list.component.html

<div class="container" style="margin-top: 20px;">
    <p-table [value]="userList" [paginator]="true" [rows]="10" [showCurrentPageReport]="true" responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [rowsPerPageOptions]="[10,25,50]">
        <ng-template pTemplate="header">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>DOB</th>
                <th>isActive</th>
                <th>Action</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
            <tr [ngClass]="{'inActive': user.isActive == false}">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.mobile}}</td>
                <td>{{user.dob | date:'d/M/yyyy'}}</td>
                <td>{{user.isActive}}</td>
                <td>
                    <a pButton pRipple type="button" [routerLink]="['/update-user',user.id]" icon="pi pi-user-edit"
                        class="p-button-rounded"></a>
                    <a pButton pRipple type="button" (click)="remove(user.id)" style="margin-left: 5px;"
                        icon="pi pi-trash" class="p-button-rounded"></a>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="paginatorleft">
            <a [routerLink]="['/add-user']" class="btn btn-primary">Add New</a>
        </ng-template>
    </p-table>
</div>

-------------------------------------------------------------------------------------------------
Step 12

Open AddUserComponent and create form Create User Form.

add-user.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id: number = 0;
  userform: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    //**************Create Reactive Form with validation********************* */
    this.userform = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', []],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gender: ['', [Validators.required]],
      dob: [null, [Validators.required]],
      id: [0, [Validators.required]],
      isActive: [true],
      range: [[0, 10]],
      userType: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    //**************Get User ID On Edit********************* */
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.userform.get('Id')?.setValue(params['id']);
        const data = this.userService.getUsersByID(this.id);
        if (data) {
          this.userform.setValue(data);
        }
      }
    });
  }

  save() {
    if (this.userform.invalid) // true if any form validation fail
      return

    if (this.userform.get('id')?.value === 0) {
      // on Create New User
      this.userService.addUser(this.userform.value);
    } else {
      // on Update User info
      this.userService.updateUser(this.userform.value);
    }

    //Redirecting to user List page after save or update
    this.router.navigate(['/user']);
  }

}

------------------------
add-user.component.html

<div class="container">
    <form [formGroup]="userform" autocomplete="off">
        <div class="mb-1">
            <label for="name" class="form-label">Name</label>
            <div class="input-group has-validation">
                <input type="text" #name [ngClass]="{'form-control': true, 'is-invalid': userform.get('name')?.invalid &&
                (userform.get('name')?.dirty || userform.get('name')?.touched)}" id="name" name="name"
                    formControlName="name" placeholder="Name">
                <div class="invalid-feedback">
                    This field is required.
                </div>
            </div>
        </div>
        <div class="mb-1">
            <label for="mobile" class="form-label">Mobile</label>
            <div class="input-group has-validation">
                <input type="number" maxlength="10" [ngClass]="{'form-control': true, 'is-invalid': userform.get('mobile')?.invalid &&
                (userform.get('mobile')?.dirty || userform.get('mobile')?.touched)}" id="mobile" name="mobile"
                    formControlName="mobile" placeholder="Mobile">
                <div class="invalid-feedback">
                    This field is required.
                </div>
            </div>
        </div>
        <div class="mb-1">
            <label for="range" class="form-label">Range</label>
            <div class="input-group has-validation">
                <p-slider formControlName="range" [ngClass]="{'form-control': true, 'is-invalid': userform.get('range')?.invalid &&
                (userform.get('range')?.dirty || userform.get('range')?.touched)}" [range]="true"></p-slider>
                <div class="invalid-feedback">
                    This field is required.
                </div>
            </div>
        </div>
        <div class="mb-1">
            <label for="email" class="form-label">Email</label>
            <div class="input-group has-validation">
                <input type="email" [ngClass]="{'form-control': true, 'is-invalid': userform.get('email')?.invalid &&
                    (userform.get('email')?.dirty || userform.get('email')?.touched)}" id="email" name="email"
                    formControlName="email" placeholder="xyz@gmail.com">
                <div class="invalid-feedback">
                    {{userform.get('email')?.hasError('required') ? 'This field is required.':'Invalid Email'}}
                </div>
            </div>
        </div>
        <div class="mb-1">
            <label for="DOB" class="form-label">DOB</label>
            <p-calendar [showIcon]="true" inputId="icon" formControlName="dob" [ngClass]="{'form-control': true, 'is-invalid': userform.get('dob')?.invalid &&
            (userform.get('dob')?.dirty || userform.get('dob')?.touched)}"></p-calendar>
        </div>
        <div class="mb-1">
            <label for="email" class="form-label">Gender {{userform.get('gender')?.value}} </label>
            <div class="input-group has-validation">
                <select [ngClass]="{'form-select': true, 'is-invalid': userform.get('gender')?.invalid &&
                    (userform.get('gender')?.dirty || userform.get('gender')?.touched)}"
                    aria-label="Default select example" formControlName="gender">
                    <option value=""> --Select--</option>
                    <option value="Male" selected="userform.get('gender')?.value=='Male'">Male</option>
                    <option value="Female" selected="userform.get('gender')?.value=='Female'">Female</option>
                </select>
                <div class="invalid-feedback">
                    This field is required.
                </div>
            </div>
        </div>
        <div class="mb-1">
            <label for="name" class="form-label">User Type</label>
            <div class="input-group has-validation">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" formControlName="userType" type="radio" id="User" value="User">
                    <label class="form-check-label" for="User">User</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" formControlName="userType" type="radio" id="Admin" value="Admin">
                    <label class="form-check-label" for="Admin">Admin</label>
                </div>
            </div>
        </div>
        <div class="mb-1">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" formControlName="isActive" id="isActive">
                <label class="form-check-label" for="isActive">Is Active</label>
            </div>
        </div>
        <div class="mb-1">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button (click)="save()" [disabled]="userform.invalid" class="btn btn-primary" type="button">
                    {{id==0 || id==null ?'Save':'Update'}}</button>
                <button class="btn btn-secondary" type="button">Reset </button>
            </div>
        </div>

        <div class="mb-1">
            {{userform.value |json}}
        </div>
    </form>
</div>


Output will display like this

https://f4n3x6c5.stackpathcdn.com/UploadFile/BlogImages/08302021121243PM/Webp.net-gifmaker.gif
