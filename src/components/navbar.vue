<script setup>
import { RouterLink } from "vue-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import router from "../router";

const signOutUser = async () => {
  console.log("signout click");

  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
  router.push("/login");
};
</script>
<template>
  <div class="bg-indigo-400 w-100">
    <ul class="w-3/4 flex justify-around m-auto p-2 text-white">
      <RouterLink :to="{ name: 'home' }">
        <li class="hover:text-black cursor-pointer">Home</li>
      </RouterLink>
      <RouterLink :to="{ name: 'about' }">
        <li class="hover:text-black cursor-pointer">About</li>
      </RouterLink>
      <RouterLink :to="{ name: 'contact' }">
        <li class="hover:text-black cursor-pointer">Contact</li>
      </RouterLink>
      <RouterLink :to="{ name: 'deal' }">
        <li class="hover:text-black cursor-pointer">secret</li>
      </RouterLink>
      <RouterLink :to="{ name: 'login' }">
        <li class="hover:text-black cursor-pointer">Login</li>
      </RouterLink>
      <RouterLink :to="{ name: 'register' }">
        <li class="hover:text-black cursor-pointer">Register</li>
      </RouterLink>

      <li class="hover:text-black cursor-pointer" @click="signOutUser">
        Log out
      </li>
    </ul>
  </div>
</template>
