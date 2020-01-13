import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../../Services/menuItems.service';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  categorySelected:any = "";
  user:any = {};
  arrayMenuItems:any = [];
  itemSelected:any = {};
  trigger:boolean = false;
  arrayItemsAddedToCart:any = [];
   msgs: Message[] = [];
  
  constructor(private menuItemsService: MenuItemsService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.categorySelected = "salad";
    this.getMenuItemsByCategory();
    this.arrayItemsAddedToCart = JSON.parse(localStorage.getItem('arrayCart'));
    if(this.arrayItemsAddedToCart === null) this.arrayItemsAddedToCart = [];
  }
  
  changeToSalad(){
    this.categorySelected = "salad";
    this.getMenuItemsByCategory();
  }
  changeToPizza(){
    this.categorySelected = "pizza";
    this.getMenuItemsByCategory();
  }
  changeToPasta(){
    this.categorySelected = "pasta";
    this.getMenuItemsByCategory();
  }
  changeToCocktails(){
    this.categorySelected = "cocktails";
    this.getMenuItemsByCategory();
  }
  changeToDrinks(){
    this.categorySelected = "drinks";
    this.getMenuItemsByCategory();
  }
  
  getMenuItemsByCategory(){
    this.arrayMenuItems = [];
    this.menuItemsService.getMenuItemsByCategory(this.categorySelected)
    .then((res)=>{
      this.arrayMenuItems = res;
      console.log(this.arrayMenuItems);
    },(err)=>{
      console.log(err);
    })
  }
  onNotify(event){
    this.getMenuItemsByCategory();
  }
  onSelect(item){
   this.itemSelected = item;
   this.trigger = true;
  }
  
  resetItemSelected(){
    this.itemSelected = {};
    this.trigger = false;
  }
  addToCart(item){
    this.arrayItemsAddedToCart.push(item);
    localStorage.setItem("arrayCart", JSON.stringify(this.arrayItemsAddedToCart));
    this.showSuccess("Item added to cart");
  }
  deleteMenuItem(){
    this.menuItemsService.deleteItem(this.itemSelected.id)
    .then((res)=>{
      console.log(res);
      this.getMenuItemsByCategory();
    },(err)=>{
      console.log(err);
    })
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
