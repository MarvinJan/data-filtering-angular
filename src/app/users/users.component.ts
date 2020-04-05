import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../shared/data.service";
import { NgForm } from "@angular/forms";

// function to access nested fields
const getField = (fields, object) => {
  fields = fields.split(".");

  return fields.reduce(
    (parent, nested) => (!!parent && !!parent[nested] ? parent[nested] : null),
    object
  );
};

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @ViewChild("filterForm", { static: false }) filters: NgForm;

  title = "DataFiltering";
  usersData: Array<any>;
  filteredData: Array<any>;
  filtersReset: boolean = false;

  filterOn = {
    BUTTON: "",
    BLUR: "blur",
    INPUT: "change",
  };

  currentFilter = this.filterOn.BUTTON;

  filterOptions = Object.entries(this.filterOn).map(([name, value]) => {
    return { name, value };
  });

  loadUsersData() {
    return this.dataService.getUsersData().subscribe((data) => {
      this.usersData = this.filteredData = data.results;
    });
  }

  clearFilters() {
    this.filters.resetForm();

    this.filteredData = this.usersData;
  }

  filterData() {
    let filterFields = Object.entries(this.filters.value);

    // each iteration filters the data further by the next filter field
    let filteredData = filterFields.reduce(
      (data: any, [filterKey, filterValue]) => {
        return data.filter((user) => {
          if (!filterValue) return true;

          return getField(filterKey, user).includes(filterValue);
        });
      },
      this.usersData
    );

    this.filteredData = filteredData;
  }

  trackBy(item, index) {
    return index;
  }

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.loadUsersData();
  }
  ngDoCheck() {
    console.log("check");
  }
}
