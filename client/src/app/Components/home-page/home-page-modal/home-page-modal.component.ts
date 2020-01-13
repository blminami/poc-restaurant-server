import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { MenuItemsService } from '../../../Services/menuItems.service';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-home-page-modal',
  templateUrl: './home-page-modal.component.html',
  styleUrls: ['./home-page-modal.component.css']
})
export class HomePageModalComponent implements OnInit {
  @Input() menuItem:any = {};
  @Input() trigger:boolean = false;
  @Output() notify = new EventEmitter();
  @ViewChild('closeBtn') closeBtn: ElementRef;
  msgs: Message[] = [];
  
  constructor(private menuItemsService: MenuItemsService) { }

  ngOnInit() {
     this.menuItem = {};
     this.menuItem.category = "salad";
  }
 
  changeValue($value){
    this.menuItem.category = $value;
  }

  saveItem(){
    if(this.trigger === false){
    if(this.menuItem.foodType!==undefined && this.menuItem.foodType!==""
    && this.menuItem.price!==undefined && this.menuItem.price!==""
    && this.menuItem.image!==undefined && this.menuItem.image!==""
    && this.menuItem.category!==undefined && this.menuItem.category!==""){
      
      this.menuItemsService.saveItem(this.menuItem)
      .then((res)=>{
        //emit event 
        console.log(res);
        this.showSuccess("Item saved");
        this.notify.emit();
        this.menuItem = {};
        this.menuItem.category = "salad";
         this.closeBtn.nativeElement.click();
      },(err)=>{
        this.showError("Item not saved");
      })
    }
    }else{
      //update item selected
      if(this.menuItem.foodType!==undefined && this.menuItem.foodType!==""
    && this.menuItem.price!==undefined && this.menuItem.price!==""
    && this.menuItem.image!==undefined && this.menuItem.image!==""
    && this.menuItem.category!==undefined && this.menuItem.category!==""){
      
      this.menuItemsService.updateItem(this.menuItem.id, this.menuItem)
      .then((res)=>{
        //emit event 
        this.showSuccess("Item updated");
       this.closeBtn.nativeElement.click();
       
      },(err)=>{
        this.showError("Item not updated");
      })
    }
    }
  }
  
   showSuccess(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: message });
  }

  showWarn(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: message });
  }

  showError(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }
}
