<script setup>
import { reactive, ref, watch } from "vue";
import router from "../router";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const userData = reactive({
  userEmail: "",
  userPassword: "",
});
const errorMessage = ref("");
const user = ref(null);
const isValue = ref(true);

watch(userData, (newValue) => {
  if (newValue.userEmail && newValue.userPassword) {
    return (isValue.value = false);
  } else {
    return (isValue.value = true);
  }
});

// Login user
const loginForm = async () => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(
      auth,
      userData.userEmail,
      userData.userPassword
    );
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage.value = "user not found";
        break;
      case "auth/wrong-password":
        errorMessage.value = "Wrong password";
        break;
      default:
        errorMessage.value = "sometgin went wrong";
    }
    return;
  }

  router.push("/");
  user.value = auth.currentUser;
};

// Checkuser status
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
    //down below means our router is  isReady mean router is ready it doesn't start to soon
    //is router .currentRouter .value.path is on login page than we will redirect to home page
    if (router.isReady() && router.currentRoute.value.path === "/login") {
      router.push("/");
    }
  } else {
    console.log("user is not logged in ");
  }
});
</script>
<template>
  <div class="w-80 m-auto mt-20 bg-gray-400 p-4 rounded-md">
    <div>
      <h1
        class="bg-black text-white rounded-md text-center font-medium capitalize p-2"
      >
        login Form
      </h1>
    </div>
    <div>
      <form @submit.prevent="loginForm">
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
            type="submit"
            :disabled="isValue"
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
  </div>
</template>
