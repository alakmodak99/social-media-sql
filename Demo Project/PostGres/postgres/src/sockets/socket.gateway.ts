/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';

@WebSocketGateway()
export class MySocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketsService) {}
  private io: any;
  server: any;
  socket: Socket;

  afterInit(server: Server) {
    this.io = server;
  }

  handleConnection(client: any) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('likePost')
  async handleLikePost(client: any, data: any) {
    try {
      const resp = await this.socketService.likePost(data);
      this.io.emit('postLiked', {
        data,
        ...resp,
      });
    } catch (err) {
      this.io.emit('postLiked', {
        data,
        ...err,
      });
    }
  }

  @SubscribeMessage('commentPost')
  async handleCommentPost(client: any, data: any) {
    try {
      const resp = await this.socketService.commentPost(data);
      this.io.emit('postCommented', {
        data,
        ...resp,
      });
    } catch (err) {
      this.io.emit('postCommented', {
        data,
        ...err,
      });
    }
  }

  @SubscribeMessage('createPost')
  async handleCreatePost(client: any, data: any) {
    try {
      const resp = await this.socketService.createPost(data);
      this.io.emit('postCreated', {
        data,
        ...resp,
      });
    } catch (err) {
      this.io.emit('postCreated', {
        data,
        ...err,
      });
    }
  }
}
