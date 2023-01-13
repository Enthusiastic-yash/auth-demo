<script setup>
import { reactive, ref, watch } from "vue";
import router from "../router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const userData = reactive({
  userEmail: "",
  userPassword: "",
});

const user = ref(null);
const isValue = ref(true);
const errorMessage = ref("");

watch(userData, (newValue) => {
  if (newValue.userEmail && newValue.userPassword) {
    return (isValue.value = false);
  } else {
    return (isValue.value = true);
  }
});

// Register user
const registerForm = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      userData.userEmail,
      userData.userPassword
    );
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage.value = "Invalid Email Address";
        break;
      case "auth/weak-password":
        errorMessage.value = "weak password";
        break;
      case "auth/email-already-in-use":
        errorMessage.value = "Email already in use";
        break;
      default:
        errorMessage.value = "something went wrond";
    }
    return;
  }
  user.value = auth.currentUser;

  router.push("/");
};
</script>
<template>
  <div class="w-80 m-auto mt-20 bg-gray-400 p-4 rounded-md">
    <div>
      <h1
        class="bg-black text-white rounded-md text-center font-medium capitalize p-2"
      >
        Register Form
      </h1>
    </div>
    <div>
      <form @submit.prevent="registerForm">
        <div class="flex flex-col">
          <label for="email" class="mt-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter you Email"
            class="bg-black text-white p-2"
            v-model.trim="userData.userEmail"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="mt-2 font-medium">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter you password"
            class="bg-black text-white p-2"
            v-model.trim="userData.userPassword"
          />
        </div>
        <div class="m-auto w-100 text-center">
          <button
            :disabled="isValue"
            type="submit"
            class="w-4/5 bg-black text-white m-auto text-center rounded-lg cursor-pointer p-2 my-4"
          >
            Submit
          </button>
        </div>
        <div>
          <p v-if="errorMessage" class="text-white bg-black text-center">
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </div>
    <!-- <div>
      <button @click="signOutUser">Sign out</button>
    </div> -->
  </div>
</template>
