import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  title = "sibedge";
  usersData: Array<any>;
  filteredData: Array<any>;
  usersDataSubscription: Subscription;
  filters = {};

  usersDataHandle() {
    return this.dataService.getUsersData().subscribe(data => {
      this.usersData = this.filteredData = data.results;
    });
  }

  setFilter(filterField: string, value: string) {
    if (!value) return delete this.filters[filterField];
    this.filters[filterField] = value;
  }

  clearFilters() {
    this.filteredData = this.usersData;
  }

  filterData() {
    // function to access nested fields
    const getField = (fields, object) => {
      return fields.reduce(
        (parent, nested) =>
          !!(parent && parent[nested]) ? parent[nested] : null,
        object
      );
    };

    let filterFields = Object.keys(this.filters);

    // each iteration filters the data further by the next filter field
    let filteredData = filterFields.reduce((data: any, filter) => {
      return data.filter(
        user =>
          (filter === "cell"
            ? getField(filter.split("."), user).replace(/\D/g, "")
            : getField(filter.split("."), user)) === this.filters[filter]
      );
    }, this.usersData);

    this.filteredData = filteredData;
  }

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.usersDataSubscription = this.usersDataHandle();
  }
  ngOnDestroy() {
    this.usersDataSubscription.unsubscribe();
  }
}
