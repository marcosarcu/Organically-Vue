<script>
import { getUserProfile, getUsers } from "../services/user-profiles";
import { sendPrivateMessage, subscribeToPrivateChat } from "../services/private-chats.js";
import { subscribeToAuthChanges } from "../services/auth";
import { timeConverter } from "../utilities/timeConverter.js";
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
            'users': [],
            'userToChat': {
                'email': null,
                'uid': null,
                'displayName': null,
            },
            'status': {
                'type': '',
                'message': ''
            },
            'messages': [],
            'message': '',
            unsubscribeAuthFn: () => { },
            unsubscribeChatFn: () => { },
        };
    },
    'mounted': function () {
        this.unsubscribeAuthFn = subscribeToAuthChanges((user) => {
            this.user = user;
        });


        getUsers().then((users) => {
            this.users = users;
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
            sendPrivateMessage({
                uid1: this.user.uid,
                uid2: this.userToChat.uid,
                text: this.message,
            });
            this.message = '';
        },
        'formatDate': function (date) {
            return timeConverter(date);
        },
        'handleUserChange': function(uid){
            this.userToChat.uid = uid;
            this.unsubscribeChatFn = subscribeToPrivateChat({ uid1: this.user.uid, uid2: this.userToChat.uid }, (messages) => {
            getUserProfile(this.userToChat.uid).then((user) => {
                this.userToChat = user;
            });
            messages.forEach((message) => {
                message.fromName = message.from === this.user.uid ? 'Tú' : this.userToChat.displayName || this.userToChat.email;
            });
            this.messages = messages;

            if(messages.length == 0){
                this.status.type = 'warning';
                this.status.message = 'No hay mensajes, envia el primero!';
            }
        });
        }

    },
    'computed': {
        'isLoading'() {
            return this.messages.length === 0 && !(this.userToChat.uid === null);
        },
    },

}



</script>

<template>
    <h1 class="text-center mt-5">Buzón de chat</h1>
    <StatusBar :type="status.type" :message="status.message"></StatusBar>
    <section class="card mt-5 mb-5">
        <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-right max-height" >

                <div class="px-4 d-none d-md-block">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <p class="p-2">Selecciona el usuario para chatear.</p>
                        </div>
                    </div>
                </div>
                
                <a v-for="userTo in users" @click.prevent="handleUserChange(userTo.uid)" href="#" class="list-group-item px-4 list-group-item-action border-0 p-2">
                    <hr class="mt-0">
                    <div class="d-flex align-items-start">
                        <i class="bi bi-chat"></i>
                        <div class="flex-grow-1 ml-3">
                            {{userTo.displayName || userTo.email}}
                        </div>
                    </div>
                </a>

            </div>
            <div class="col-12 col-lg-7 col-xl-9">
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
                            <Skeletor v-if="isLoading" width="33%" height="60px" class="chat-message-right"></Skeletor>
                            <Skeletor v-if="isLoading" width="33%" height="60px" class="chat-message-left"></Skeletor>
                        </template>
                        <template v-if="userToChat.uid == null">
                            <div class="h-100 w-100 text-center">
                                <b>Elegí un usuario para chatear.</b>
                            </div>
                        </template>
                        <div :class="`${message.fromName === 'Tú' ? 'chat-message-right' : 'chat-message-left'} pb-4`"
                            v-for="message in messages" :key="message.id">
                            <div class="m-2">
                                <div class="text-muted small text-nowrap mt-2 d-md-block d-none">{{
                                        formatDate(message.created_at)
                                }}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div class="mb-1"><b>{{ message.fromName }}</b></div>
                                <p>{{ message.text }}</p>
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