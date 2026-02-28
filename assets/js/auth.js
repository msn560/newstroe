/**
 * Auth — Login, Register, SweetAlert2 entegrasyonu
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'eticaret_user';

  function getStoredUser() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setStoredUser(user) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearStoredUser() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function isLoggedIn() {
    return !!getStoredUser();
  }

  function initLoginForm() {
    var form = document.getElementById('login-form');
    if (!form || typeof Swal === 'undefined') return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('#email').value.trim();
      var password = form.querySelector('#password').value;

      if (!email || !password) {
        Swal.fire({
          icon: 'warning',
          title: 'Eksik Bilgi',
          text: 'Lütfen e-posta ve şifrenizi girin.',
          confirmButtonColor: '#ea580c'
        });
        return;
      }

      // Demo: Herhangi bir email/şifre ile giriş (gerçek uygulamada API çağrısı)
      var user = {
        name: email.split('@')[0],
        email: email,
        loginAt: new Date().toISOString()
      };
      setStoredUser(user);

      Swal.fire({
        icon: 'success',
        title: 'Giriş Başarılı!',
        text: 'Hesabınıza yönlendiriliyorsunuz...',
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(function () {
        window.location.href = '../user/index.html';
      });
    });
  }

  function initRegisterForm() {
    var form = document.getElementById('register-form');
    if (!form || typeof Swal === 'undefined') return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var surname = form.querySelector('#surname').value.trim();
      var email = form.querySelector('#reg-email').value.trim();
      var password = form.querySelector('#reg-password').value;
      var passwordConfirm = form.querySelector('#reg-password-confirm').value;

      if (!name || !surname || !email || !password) {
        Swal.fire({
          icon: 'warning',
          title: 'Eksik Bilgi',
          text: 'Lütfen tüm alanları doldurun.',
          confirmButtonColor: '#ea580c'
        });
        return;
      }

      if (password.length < 6) {
        Swal.fire({
          icon: 'warning',
          title: 'Şifre Kısa',
          text: 'Şifre en az 6 karakter olmalıdır.',
          confirmButtonColor: '#ea580c'
        });
        return;
      }

      if (password !== passwordConfirm) {
        Swal.fire({
          icon: 'error',
          title: 'Şifreler Eşleşmiyor',
          text: 'Şifre ve şifre tekrar alanları aynı olmalıdır.',
          confirmButtonColor: '#ea580c'
        });
        return;
      }

      var user = {
        name: name + ' ' + surname,
        email: email,
        loginAt: new Date().toISOString()
      };
      setStoredUser(user);

      Swal.fire({
        icon: 'success',
        title: 'Kayıt Başarılı!',
        text: 'Hesabınız oluşturuldu. Yönlendiriliyorsunuz...',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(function () {
        window.location.href = '../user/index.html';
      });
    });
  }

  function updateUserDisplay() {
    var user = getStoredUser();
    var nameEl = document.getElementById('user-name');
    var emailEl = document.getElementById('user-email');
    if (nameEl && user) nameEl.textContent = user.name || 'Kullanıcı';
    if (emailEl && user) emailEl.textContent = user.email || '';
  }

  window.getStoredUser = getStoredUser;
  window.setStoredUser = setStoredUser;
  window.clearStoredUser = clearStoredUser;
  window.isLoggedIn = isLoggedIn;
  window.updateUserDisplay = updateUserDisplay;

  document.addEventListener('DOMContentLoaded', function () {
    initLoginForm();
    initRegisterForm();
    updateUserDisplay();
  });
})();
