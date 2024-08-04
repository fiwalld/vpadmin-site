<template>
  <div class="login-container">
    <div class="close-button" @click="handleClose">×</div>
    <div class="tabs">
      <div
          :class="['tab', { active: activeTab === 'account' }]"
          @click="activeTab = 'account'"
      >
        账号密码登录
      </div>
      <div
        :class="['tab', { active: activeTab === 'sms' }]"
        @click="activeTab = 'sms'"
      >
        短信验证码登录
      </div>

    </div>
    <div class="tab-content" v-if="activeTab === 'sms'">
      <form @submit.prevent="handleSMSLogin">
        <div class="form-item">
          <select v-model="sms.countryCode" class="country-code">
            <option value="+86">+86</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <!-- 其他国家码 -->
          </select>
          <input v-model="sms.phone" type="text" placeholder="手机号" />
        </div>
        <div class="form-item captcha-container">
          <input v-model="sms.captcha" type="text" placeholder="图形验证码" />
          <img :src="captchaSrc" @click="refreshCaptcha" alt="图形验证码" />
        </div>
        <div class="form-item code-container">
          <input v-model="sms.code" type="text" placeholder="短信验证码" />
          <button
            type="button"
            @click="sendCode"
            :disabled="isCodeSending"
          >
            {{ sendButtonText }}
          </button>
        </div>
        <div class="form-item button-container">
          <span></span> <!-- Empty span for the first column -->
          <button type="submit">登录</button>
          <span class="register-text" @click="handleRegister">立即注册</span>
        </div>
      </form>
    </div>
    <div class="tab-content" v-if="activeTab === 'account'">
      <form @submit.prevent="handleAccountLogin">
        <div class="form-item">
          <input v-model="account.username" type="text" placeholder="用户名" />
        </div>
        <div class="form-item">
          <input v-model="account.password" type="password" placeholder="密码" />
        </div>
        <div class="form-item captcha-container">
          <input v-model="account.captcha" type="text" placeholder="图形验证码" />
          <img :src="captchaSrc" @click="refreshCaptcha" alt="图形验证码" />
        </div>
        <div class="form-item button-container">
          <span></span> <!-- Empty span for the first column -->
          <button type="submit">登录</button>
          <span class="register-text" @click="handleRegister">立即注册</span>
        </div>
      </form>
    </div>
    <div class="third-party-login">
      <span>第三方登录：</span>
      <i class="fab fa-weixin" @click="loginWithWeChat"></i>
      <i class="fab fa-qq" @click="loginWithQQ"></i>
      <i class="fab fa-weibo" @click="loginWithWeibo"></i>
    </div>
    <div class="notification" v-if="showNotification">
      验证码已发送
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref<'sms' | 'account'>('sms');
const sms = ref({ countryCode: '+86', phone: '', code: '', captcha: '' });
const account = ref({ username: '', password: '', captcha: '' });
const captchaSrc = ref('https://via.placeholder.com/100x40?text=CAPTCHA');

const phoneRegex = /^1[3-9]\d{9}$/;

const isCodeSending = ref(false);
const sendButtonText = ref('发送验证码');
const showNotification = ref(false);
let countdownTimer: number | null = null;
let notificationTimer: number | null = null;

const sendCode = () => {
  if (!phoneRegex.test(sms.value.phone)) {
    alert('请输入有效的手机号');
    return;
  }
  showNotification.value = true;
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notificationTimer = setTimeout(() => {
    showNotification.value = false;
  }, 3000);
  startCountdown();
};

const startCountdown = () => {
  let countdown = 60;
  sendButtonText.value = `${countdown}s后重新发送`;
  isCodeSending.value = true;
  countdownTimer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      sendButtonText.value = `${countdown}s后重新发送`;
    } else {
      clearInterval(countdownTimer as number);
      sendButtonText.value = '发送验证码';
      isCodeSending.value = false;
    }
  }, 1000);
};

const handleSMSLogin = () => {
  if (!sms.value.phone || !sms.value.code || !sms.value.captcha) {
    alert('请填写完整信息');
    return;
  }
  alert('短信登录成功');
};

const handleAccountLogin = () => {
  if (!account.value.username || !account.value.password || !account.value.captcha) {
    alert('请填写完整信息');
    return;
  }
  alert('账号密码登录成功');
};

const loginWithWeChat = () => {
  alert('微信登录');
};

const loginWithQQ = () => {
  alert('QQ登录');
};

const loginWithWeibo = () => {
  alert('微博登录');
};

const refreshCaptcha = () => {
  captchaSrc.value = `https://via.placeholder.com/100x40?text=CAPTCHA&${Math.random()}`;
};

const handleRegister = () => {
  alert('注册页面');
};

const handleClose = () => {
  alert('关闭按钮被点击');
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: #ccc;
}

.close-button:hover {
  color: #999;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom: 2px solid #42b983;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Add margin-bottom for spacing */
}

.login-container input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.login-container select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.login-container button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #38a177;
}

.login-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.third-party-login {
  margin-top: 20px;
  text-align: center;
}

.third-party-login span {
  margin-right: 10px;
}

.third-party-login i {
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
}

.third-party-login i:hover {
  color: #42b983;
}

.code-container,
.captcha-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.code-container input,
.captcha-container input {
  flex: 1 0 60%;
}

.code-container button,
.captcha-container img {
  flex: 0 1 35%;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.button-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 15px; /* Add margin-bottom for spacing */
}

.button-container button {
  grid-column: 2; /* Center the button in the middle column */
  justify-self: center;
  width: 150px; /* Set button width to 150px */
}

.button-container .register-text {
  color: blue;
  cursor: pointer;
  justify-self: end; /* Align register text to the end */
}

.button-container .register-text:hover {
  color: red;
}

.notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
