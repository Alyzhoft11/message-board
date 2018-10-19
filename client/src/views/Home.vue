<template>
  <div class="home">
    <button @click="showMessageForm = !showMessageForm" type="button" class="btn btn-info mt-3 mb-2">Toggle Message Form</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage" class="mb-3">
      <fieldset>
        <legend>Legend</legend>
        <div class="form-group">
          <label class="col-form-label" for="Username">Username</label>
          <input v-model="message.userName" type="text" class="form-control" id="Username" required>
        </div>
        <div class="form-group">
          <label class="col-form-label" for="Subjeect">Subject</label>
          <input v-model="message.subject" type="text" class="form-control" placeholder="Subject" id="Subject" required>
        </div>
        <div class="form-group">
          <label class="col-form-label" for="imageURL">Image URL</label>
          <input v-model="message.imageURL" type="url" class="form-control" placeholder="Image URL" id="imageURL">
        </div>
        <div class="form-group">
          <label for="Message">Message</label>
          <textarea v-model="message.message" class="form-control" id="Message" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add Message</button>
      </fieldset>
    </form>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{ message.userName }}</h4>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          {{ message.message }}
          <br />
          <small>{{ message.created }}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/messages';

export default {
  name: 'home',
  data: () => ({
    showMessageForm: false,
    messages: [],
    message: {
      userName: 'Anonymous',
      subject: '',
      imageURL: '',
      message: ''
    }
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL)
      .then(res => res.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => res.json())
      .then(result => {
          this.messages.push(result);
          this.message.userName = 'Anonymous';
          this.message.subject = '';
          this.message.imageURL = '';
          this.message.message = '';
      });
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid white;
}

img {
  max-width: 300px;
  height: auto;
}
</style>
