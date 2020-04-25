import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { GithubUserItem } from 'src/app/_models/github-search.model';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultItemComponent implements OnInit {
  @Input() item: GithubUserItem;

  constructor() {}

  ngOnInit(): void {}
}
