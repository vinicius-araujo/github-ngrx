import { Component, OnInit, Input } from "@angular/core";
import { GithubUserItem } from "src/app/_models/github-search.model";

@Component({
  selector: "app-result-list",
  templateUrl: "./result-list.component.html",
  styleUrls: ["./result-list.component.scss"],
})
export class ResultListComponent implements OnInit {
  @Input() results: GithubUserItem[];
  @Input() isLoading: boolean;

  public loadingArray = new Array(4).fill("loading");

  constructor() {}

  ngOnInit(): void {}

  public trackByUser(index: any, user: GithubUserItem) {
    return user ? user.id : index;
  }
}
