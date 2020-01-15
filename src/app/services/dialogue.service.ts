import { Injectable } from '@angular/core';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Injectable({providedIn: 'root'})

export class DialogueService {

    private dialogueComponent:DialogueComponent;

    public setComponent(dialogueComponent:DialogueComponent) {
        this.dialogueComponent = dialogueComponent;
    }

    public showMessage(messageText:string, okText:string, onOk:()=>void, cancelText:string, onCancel?:()=>void) {
        this.dialogueComponent.showMessage(messageText, okText, onOk, cancelText, onCancel);
    }

}