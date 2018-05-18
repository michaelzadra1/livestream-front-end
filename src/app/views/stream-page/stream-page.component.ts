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
  sub: any;
  videoId;
  chat: any;
  chatMessages: any;
  stream: any;
  url;
  iframeUrl: any;

  chatToken: any;
  refreshChat = {};
  subscribeChat: any;
  newMessages: any;


  pollingInterval: any;

  constructor(
    private streamsService: StreamsService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnDestroy() {
    if (this.subscribeChat) {
      this.subscribeChat.unsubscribe();
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
        this.stream = response.stream_details;

        if (!this.iframeUrl) {
          this.url = `https://www.youtube.com/embed/live_stream?channel=${response.stream_details['channel_id']}`;
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        }

        this.chat = response.chat;
        if (this.chat) {
          this.chat = response.chat;
          this.chatMessages = this.chat['items'];
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Start polling chat if chat object recieved for stream
        if (this.chat) {
          this.refreshChat['chatToken'] = this.chat['nextPageToken'];
          this.refreshChat['chatId'] = this.stream['chat_id'];
          this.pollChat();
        }
      }
    );

  }
  pollChat() {
    this.subscribeChat = this.streamsService.refreshChat(this.refreshChat).subscribe(
      (response) => {
        this.newMessages = response['items'];
        this.chatMessages = this.chatMessages.concat(this.newMessages);
        console.log(this.newMessages);
      },
    );
  }
}
