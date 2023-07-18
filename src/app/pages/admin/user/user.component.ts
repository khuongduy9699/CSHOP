import { Component, ViewChild } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UserDTO } from 'src/api/user/user.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!:MatTableDataSource<UserDTO>;
  displayedColumns: string[] = [
    'id',
    'userName',
    'name',
    'role',
    'createdAt',
  ];
  isLoading:boolean=true;
  roles=[{name: 'admin', amount: 0}, {name:'user', amount: 0}];
  adminAmount=0;
  userAmount=0;
  usersByRole:{[id:string]:UserDTO[]}[]=[];

  constructor(private userService: AuthService, private router: Router, private _snackBar: SnackbarService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit():void {
    this.getUsers();
  }

  applyFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  getUsers():void{
    this.userService.getUsers().subscribe({
      next: (res)=> {
        res.map(item=>{
          return item.role==='admin'?this.adminAmount++:this.userAmount++;
        })
        this.usersByRole.push(this.getUsersByRole(res));
        this.roles.forEach((role)=> {
          role.amount=this.usersByRole[0][role.name].length
        })

        this.users = new MatTableDataSource<UserDTO>(res);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
      },
      error: (error)=>{
        this._snackBar.open('Error: ' + error, 'error');
      },
      complete: ()=>{
        timer(2000).subscribe({
          next: (res)=>this.isLoading=false});
      }
    })
  }

  navigateBack():Promise<boolean>{
    return this.router.navigate(['..'])
  }

  onReload():void{
    this.isLoading=true;
    this.getUsers();
  }

  onRoleChange(event: MatChipSelectionChange):void{
    if(event.selected){
      this.showProductByCategory(event.source.value)
    }
    else {
      this.getUsers();
    }
  }

  showProductByCategory(role: string):void{
    this.users=new MatTableDataSource(this.usersByRole[0][role]);
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  getUsersByRole(data:UserDTO[]):{[id:string]:UserDTO[]} {
    return data.reduce(function (r, a) {
      if(a.role){
        r[a.role] = r[a.role] || [];
        r[a.role].push(a);
        return r;
      }
  }, Object.create(null))
  }
}
