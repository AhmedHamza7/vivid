import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
ToastrService

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr:ToastrService) { }

  fireSuccessToastr(title:string, body:string){
    this.toastr.success(title, body)
  }

  fireErrorToastr(title:string, body:string){
    this.toastr.error(title, body)
  }
}
