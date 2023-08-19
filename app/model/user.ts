// export class User {
//     Id:any;Name:any;Email:any;
//     Mobile: any;
//     Gender: any;
//     Dob: any;
//     IsActive: boolean;
//     Range: any;
//     UserType: any;

//     users(id:number,name:string,email:string,gender:string,number:number,dob:Date,isActive:boolean,range:Range){
//     this.Id= id
//     this. Name= name,
//     this.Email = email,
//     this.Mobile =number ,
//     this.Gender = gender,
//     this.Dob = dob,
//     this.IsActive = isActive,
//     this.Range = range
//     this.UserType? = string
//     }
// }
export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  dob: Date;
  isActive: boolean;
  range?: any;
  userType?: string;
}
