import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamsService } from '../../services/streams.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stream-page',
  templateUrl: './stream-page.component.html',
})
export class StreamPageComponent implements OnInit, OnDestroy {
  loading = false;
  streamError = false;

  sub: any;
  videoId;
  chat: any;
  chatMessages: any;
  stream: any;
  iframeUrl: any;

  refreshChat = {};
  newMessages: any;
  messageRate: number = null;
  messagePollInterval: any;
  hypeValue: number;

  constructor(
    private streamsService: StreamsService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnDestroy() {
    if (this.messagePollInterval) {
      clearInterval(this.messagePollInterval);
    }
  }
  ngOnInit() {
    // get stream video id
    this.sub = this.route.params.subscribe(
      params => {
        this.videoId = params['videoId'];
      }
    );
    this.loading = true;
    // get stream chat and details
    this.streamsService.getStream(this.videoId).subscribe(
      (response) => {
        this.loading = false;
        if (response) { // ensure no error in reteiving livestream
          this.stream = response.stream_details;
          if (!this.iframeUrl) {
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/live_stream?channel=${response.stream_details['channel_id']}`);
          }
          this.chat = response.chat;
          if (this.chat) {
            this.chat = response.chat;
            this.chatMessages = this.chat['items'];
            this.refreshChat['chatToken'] = this.chat['nextPageToken'];
            this.refreshChat['pollingIntervalMillis'] = this.chat['pollingIntervalMillis'];
            this.refreshChat['chatId'] = this.stream['chat_id'];
          }
        } else {
          this.streamError = true;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Start polling chat if chat object recieved for stream
        if (this.chat) {
          this.pollChat();
        }
      }
    );

  }
  pollChat() {
    // Poll the refresh chat endpoint based on polling interval returned by YouTube API
    this.messagePollInterval = setInterval( () => {
      this.streamsService.refreshChat(this.refreshChat).subscribe(
        (response) => {
          this.refreshChat['chatToken'] = response['nextPageToken'];
          this.refreshChat['pollingIntervalMillis'] = response['pollingIntervalMillis'];
          this.newMessages = response['items'];
          this.chatMessages = this.chatMessages.concat(this.newMessages);
          this.updateHype();
        },
      );
    }, this.refreshChat['pollingIntervalMillis']);
  }
  updateHype() {
    this.messageRate = ( (this.newMessages.length) / (this.refreshChat['pollingIntervalMillis'] / 1000) );
    this.messageRate = Math.round(this.messageRate * 100) / 100; // round to 2 decimal places
    console.log(this.messageRate);
    this.hypeValue = (this.messageRate / 2) * 100;
  }
}
