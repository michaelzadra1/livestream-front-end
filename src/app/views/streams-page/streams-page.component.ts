import { Component, OnInit } from '@angular/core';
import { StreamsService } from '../../services/streams.service';

@Component({
  selector: 'app-streams-page',
  templateUrl: './streams-page.component.html'
})
export class StreamsPageComponent implements OnInit {
  loading = false;
  streams: any[];

  constructor(
    private streamsService: StreamsService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.streamsService.getStreams().subscribe(
      (response) => {
        this.loading = false;
        this.streams = response;
      }
    );
  }

}
