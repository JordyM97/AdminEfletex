import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatRoom } from 'src/app/models/chat-room';
//import { IonContent, ModalController, NavParams } from '@angular';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

 public chatRooms: any=[];
  chat:ChatRoom;
  messages:Message[]=[];
  newMsg:string='';
  urlPhoto:string='';
  

  constructor(
    public chatService: ChatService,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {
    this.chatService.getChatRooms().subscribe(
      chats => {
        console.log("El arreglo de chats",chats)
        this.chatRooms=chats
      }
    )
   }

   ngOnInit() {
    
  }

  openChat(chat) {
    this.chat=chat;
    console.log(this.chat.id)
    this.chatService.getMessages(this.chat.id).subscribe(
      (messages: Message[]) => {
        //console.error('LosMessages > ',messages)
        this.messages=messages.map(
          msg => {
            
            let message:Message={
              createdAt:msg.createdAt,
              from: msg.from,
              msg: msg.msg,
              myMsg: msg.from === this.authService.userApp.uid,
              urlPhoto: msg.urlPhoto,
              isPhoto:msg.isPhoto
            };

            console.log('Message > ', message);

            return message;
            }    
        );
       // console.error('Los New Messages > ',this.messages)
      }
    );

    
    //this.chat=this.nav_params.get('chat');
    
  }



  sendMessage(){
    console.log('NMsg',this.newMsg);
    if (this.newMsg.length===0){
      return;
    }
    this.chatService.addChatMessage(this.chat.id,this.newMsg, this.urlPhoto).then(
      () => { console.log('NMsg Enviado',this.newMsg); this.newMsg="";
        //this.newMsg = '';
        //this.content.scrollToBottom();
       // console.log('NMsg',this.newMsg);
      
      }).catch((err)=> console.error("Error al enviar el mensaje",err))
  }

  async uploadPhoto(e)  {
    console.log('subir',e.target.files[0]);
    const file=e.target.files[0];
    const filePath=`imgChats/_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.urlPhoto=url});
    
  }

}
