import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsersComponent } from "./users/users.component";
import { UsersTableComponent } from "./users/users-table/users-table.component";
// import { MaterialModule } from "./material/material.module";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [AppComponent, UsersComponent, UsersTableComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MaterialModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
