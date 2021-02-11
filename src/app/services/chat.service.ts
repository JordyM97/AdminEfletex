import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { ChatRoom } from '../models/chat-room';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { Message } from '../models/message';
//import { stringify } from 'querystring';
//import { url } from 'inspector';

@Injectable(//{
  //providedIn: 'root'
)
export class ChatService {

  private chatCollection: AngularFirestoreCollection<any>;
  private chatRooms: Observable<any[]>;

  private messagesCollection: AngularFirestoreCollection<Message>;
  public messages: Observable<Message[]>;




  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,

  ) {
    this.chatCollection = this.afs.collection<ChatRoom>('chatRoomsTest');
    this.chatRooms = this.chatCollection.snapshotChanges();

   }

  getChatRooms(){
    return this.chatRooms.pipe(
      map(
        rooms => {
          return rooms.map(
            item => {
              const data: ChatRoom = item.payload.doc.data() as ChatRoom;
              data.id=item.payload.doc.id;
              return data;
              
            }
          ).filter(data => {
              console.log('ChatRoom.id > ',data.id);
              let uids =data.id.split('-');
              let uidadmin= uids[1];
              let uidOther= uids[0];
              let uidCurrent = this.authService.userApp.uid;
              console.log('current user > ',this.authService.userApp);
              return (uidCurrent===uidadmin || uidCurrent==uidOther)
              
          });
        }
      )
    )
  }
  getMessages(chatRoom:string){
    console.log('cg> ',chatRoom)
    this.messagesCollection = this.afs.collection<any>(`/chatRoomsTest/${chatRoom}/messages`,(ref)=>ref.orderBy('createdAt'));
    return this.messagesCollection.valueChanges();
  }

  addChatMessage(chatRoom:string,msg:string, urlPhoto:string){
    let isPhoto:boolean=false;
    if(urlPhoto!=''){
      isPhoto=true;
    }
    return this.afs.collection(`/chatRoomsTest/${chatRoom}/messages`).add(
      {
        msg,
        from: this.authService.userApp.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        urlPhoto,
        isPhoto
      
      }
    );
  }

} 