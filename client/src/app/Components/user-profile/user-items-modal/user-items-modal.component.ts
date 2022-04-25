import { Component, OnInit, Input } from "@angular/core";
import { IntermediatesService } from "../../../Services/intermediates.service";
import { MenuItemsService } from "../../../Services/menuItems.service";

@Component({
  selector: "app-user-items-modal",
  templateUrl: "./user-items-modal.component.html",
  styleUrls: ["./user-items-modal.component.css"],
})
export class UserItemsModalComponent implements OnInit {
  user: any = {};
  arrayItems: any = [];
  arrayMenuItems: any = [];
  result: any = {};
  objMenu: any = {};
  total: number = 0;
  @Input() id = 0;

  constructor(
    private intService: IntermediatesService,
    private menuItemsService: MenuItemsService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnChanges() {
    console.log(this.id);
    this.getMenuItems();
  }

  getMenuItems() {
    this.arrayItems = [];
    this.arrayItems = [];
    this.arrayMenuItems = [];
    this.result = [];
    if (this.id !== undefined) {
      this.result = {};
      this.intService.getIntermediatesByOrder(this.id).then(
        (res) => {
          this.arrayItems = res;
          var arrayIds = [];
          for (var i = 0; i < this.arrayItems.length; i++) {
            arrayIds.push(this.arrayItems[i].menuItemId);
          }
          this.menuItemsService.getMenuItemsById(arrayIds).then(
            (result) => {
              this.result = result;
              this.total = 0;
              for (var i = 0; i < this.arrayItems.length; i++) {
                for (var j = 0; j < this.result.length; j++) {
                  if (
                    parseInt(this.arrayItems[i].menuItemId) ===
                    parseInt(this.result[j].id)
                  ) {
                    this.objMenu = {};
                    this.objMenu.id = this.arrayItems[i].menuItemId;
                    this.objMenu.foodType = this.result[j].foodType;
                    this.objMenu.price = this.arrayItems[i].priceItem;
                    this.objMenu.quantity = this.arrayItems[i].quantity;
                    this.objMenu.category = this.result[j].category;
                    this.total +=
                      parseFloat(this.objMenu.price) *
                      parseInt(this.objMenu.quantity);
                    this.arrayMenuItems.push(this.objMenu);
                  }
                }
              }
              console.log(this.arrayMenuItems);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
