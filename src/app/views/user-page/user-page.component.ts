import { Component, OnInit } from '@angular/core';
import { StreamsService } from '../../services/streams.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  loading = false;
  userId: string;
  userMessages: any;
  sub: any;

  constructor(
    private streamsService: StreamsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // get stream video id
    this.sub = this.route.params.subscribe(
      params => {
        this.userId = params['userId'];
      }
    );
    this.loading = true;
    this.streamsService.getUserMessages(this.userId).subscribe(
      (response) => {
        this.loading = false;
        this.userMessages = response;
        console.log(response);
      }
    );
  }

}
