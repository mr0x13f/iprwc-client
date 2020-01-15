import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../services/dialogue.service';

@Component({
    selector: 'app-dialogue',
    templateUrl: './dialogue.component.html',
    styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

    active = false;
    messageText = "This is a message box!";
    okText = "Ok";
    onOk = ()=>{};
    cancelText = "Cancel";
    onCancel = ()=>{};

    constructor(
        private dialogueService:DialogueService
    ) { }

    ngOnInit() {

        this.dialogueService.setComponent(this);

    }

    showMessage(messageText:string, okText:string, onOk:()=>void, cancelText:string, onCancel?:()=>void) {

        this.messageText = messageText;
        this.okText = okText;
        this.onOk = onOk;
        this.cancelText = cancelText;
        this.onCancel = onCancel;
        this.active = true;

    }

    onOkClick() {
        this.active = false;
        this.onOk();
    }

    onCancelClick() {
        this.active = false;
        if (this.onCancel) this.onCancel();
    }


}
