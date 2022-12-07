<script>
import { getUserProfile } from "../services/user-profiles";
import { sendPrivateMessage, subscribeToPrivateChat, adminUid } from "../services/private-chats.js";
import { subscribeToAuthChanges } from "../services/auth";
import {timeConverter} from "../utilities/timeConverter.js";
import { Skeletor } from 'vue-skeletor';
import StatusBar from '../assets/components/StatusBar.vue';


export default {
    'name': 'PrivateChat',
    'components': { Skeletor, StatusBar },
    'data': function () {
        return {
            'user': {
                'email': null,
                'uid': null,
                'displayName': null,
            },
            'userToChat': {
                'email': null,
                'uid': null,
                'displayName': null,
            },
            'status': {
                'type': 'success',
                'message': ''
            },
            'messages': [],
            'message': '',
            'emptyChat': false,
            unsubscribeAuthFn: () => { },
            unsubscribeChatFn: () => { },
        };
    },
    'mounted': function () {
        this.unsubscribeAuthFn = subscribeToAuthChanges((user) => {
            this.user = user;
        });
        this.unsubscribeChatFn = subscribeToPrivateChat({ uid1: this.user.uid, uid2: this.$route.params.id }, (messages) => {
            this.status.message = '';
            this.emptyChat = false;
            getUserProfile(this.$route.params.id).then((user) => {
                this.userToChat = user;
            });
            messages.forEach((message) => {
                message.fromName = message.from === this.user.uid ? 'Tú' : this.userToChat.displayName || this.userToChat.email;
            });
            this.messages = messages;

            if(messages.length == 0){
                this.status.type = 'warning';
                this.status.message = 'No hay mensajes, envia el primero!';
                this.emptyChat = true;
            }
        });
    },
    'unmounted': function () {
        this.unsubscribeAuthFn();
        if (typeof this.unsubscribeChatFn === 'function') {
            this.unsubscribeChatFn();
        }
    },
    'methods': {
        'handleSubmit': function () {
            console.log('handleSubmit', this.user.uid);
            sendPrivateMessage({
                uid1: this.user.uid,
                uid2: this.$route.params.id,
                text: this.message,
            });
            this.message = '';
        },
        'formatDate': function (date) {
            return timeConverter(date);
        },

    },
    'computed': {
        'isLoading' () {
            return this.messages.length === 0 && !this.emptyChat;
        },
    },
    
}



</script>

<template>
    <h1 class="text-center mt-5">Chat de ayuda</h1>
    <StatusBar :type="status.type" :message="status.message"></StatusBar>
    <section class="card mt-5 mb-5" >
        <div class="row g-0">
            <div class="col-12 col-md-12">
                <div class="py-2 px-4 border-bottom">
                    <div class="d-flex align-items-center py-1">
                        <div class="flex-grow-1 pl-3">
                            <Skeletor v-if="isLoading" width="200px"></Skeletor>
                            <strong>{{ userToChat.displayName || userToChat.email }}</strong>
                        </div>
                    </div>
                </div>
                <div class="position-relative">
                    <div class="chat-messages p-4">
                        <template v-for="i in 6">
                            <Skeletor v-if="(isLoading)" width="33%" height="60px" class="chat-message-right"></Skeletor>
                            <Skeletor v-if="(isLoading)" width="33%" height="60px" class="chat-message-left"></Skeletor>
                        </template>
                        <div
                        :class="`${message.fromName === 'Tú' ? 'chat-message-right' : 'chat-message-left'} pb-4`"
                        v-for="message in messages"
                        :key="message.id"
                        >
                            <div class="m-2">
                                <div class="text-muted small text-nowrap mt-2 d-md-block d-none">{{ formatDate(message.created_at ) }}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div class="mb-1"><b>{{message.fromName}}</b></div>
                                <p>{{message.text}}</p>
                            </div>
                        </div>  
                        
                        
                    </div>
                </div>
                <div class="flex-grow-0 py-3 px-4 border-top">
                    <form @submit.prevent="handleSubmit" class="input-group">
                        <input v-model="message" type="text" class="form-control" placeholder="Escribí tu mensaje">
                        <button type="submit" class="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

</template>