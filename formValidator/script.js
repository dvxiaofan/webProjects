const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// 显示输入错误信息
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// 显示成功边框
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// 邮箱校验
function checkEmail(input) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else showError(input, '请输入正确邮箱');
}

// 校验必填项
function checkRequired(inputArr) {
  let isRequired = false;

  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} 不能为空`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// 校验输入长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} 长度必须大于 ${min} 字符`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} 长度必须小于 ${max} 字符`);
  } else showSuccess(input);
}

// 获取元素名称
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// 校验两次密码
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '两次密码输入不一致');
  }
}

// 提交事件
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }
});
