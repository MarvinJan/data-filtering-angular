import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"]
})
export class UsersTableComponent implements OnInit {
  @Input() set usersData(value) {
    if (!value) return;
    this.data = value;
    this.recountPages();
  }
  data;
  displayedUsers: number = 10;
  pages: number = 1;
  currentPage: number = 1;
  paginatedUsersData;
  arr = Array; // array type to use this.pages number with ngFor

  recountPages() {
    if (this.data.length < this.displayedUsers) {
      this.setCurrentPage(1);
      return (this.pages = 0);
    }
    let newPagesValue = Math.ceil(this.data.length / this.displayedUsers);
    this.pages = newPagesValue;
    if (this.currentPage > newPagesValue) this.setCurrentPage(newPagesValue);
    this.paginatedUsersData = this.getPaginatedUserData(
      this.currentPage,
      this.data
    );
  }
  setCurrentPage(value: number) {
    this.paginatedUsersData = this.getPaginatedUserData(value, this.data);
    this.currentPage = value;
  }
  getPaginatedUserData(page: number, data) {
    if (!data) return null;
    let end: number = page * this.displayedUsers;
    let start: number = end - this.displayedUsers;

    return data.slice(start, end);
  }
  setDisplayedUsers(value: number) {
    this.displayedUsers = value;
    this.recountPages();
  }

  constructor() {}

  ngOnInit() {}
}
