<script setup lang="ts">
import AuthCache from '@/cache/auth.cache';
import { UploadFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const loading = ref(false);
const router = useRouter();

function login() {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    AuthCache.set('true');
    router.push({
      name: 'Main',
    });
  }, 300);
}
</script>

<template>
  <div class="login__wrapper">
    <div class="login__form">
      <h3>Требуется вход в систему!</h3>
      <el-button
        :icon="UploadFilled"
        type="primary"
        size="large"
        :loading="loading"
        @click="login"
      >
        Вход
      </el-button>
    </div>
  </div>
</template>

<style>
.login__wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__wrapper h3 {
  color: #6c6e72;
}

.login__form {
  width: 400px;
  height: 200px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
