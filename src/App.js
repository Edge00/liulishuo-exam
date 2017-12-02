import React, { Component } from 'react';
import Button from './components/Button/';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      buttonTxt: '请输入有效的手机号码',
      isButtonClickAble: false,
      interval: 40,
    }
  }

  componentDidMount() {
    const { interval } = this.state;
    let lastValidate = localStorage.getItem('lastValidate');
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!lastValidate) return;
    const time = ((Date.now() - Number(lastValidate)) / 1000).toFixed(0);
    if (time < interval) {
      this.setState({
        isButtonClickAble: false,
        phoneNumber,
        buttonTxt: `${interval - time}s 后重新发送`,
      });
      this.countDown(interval - time);
    }
  }

  componentWillUnmount() {
    if (this.countTimer) clearInterval(this.countTimer);
  }

  // 实时验证输入的手机号，格式不正确不可以点击发送按钮
  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value }, () => {
      const { phoneNumber } = this.state;
      const validated = /^1[0-9]{10}$/.test(phoneNumber);
      if (validated) {
        this.setState({
          isButtonClickAble: true,
          buttonTxt: '发送验证码',
        });
      } else {
        this.setState({
          isButtonClickAble: false,
          buttonTxt: '请输入有效的手机号码',
        });
      }
    });
  }

  handleValidateClick = async () => {
    this.setState({
      isButtonClickAble: false,
      buttonTxt: '验证中',
    });
    const { code, data, info } = await this.validate(this.state.phoneNumber);
    if (code === 0) {
      console.log(data);
      this.setState({ isButtonClickAble: false });
      this.countDown(this.state.interval);
      localStorage.setItem('lastValidate', Date.now());
      localStorage.setItem('phoneNumber', this.state.phoneNumber);
    } else {
      alert(info);
      this.setState({ buttonTxt: '请输入有效的手机号码' });
    }
  }

  // 按钮倒计时
  countDown = (count) => {
    this.countTimer = setInterval(() => {
      count = count - 1;
      if (count <= 0) {
        clearInterval(this.countTimer);
        this.setState({
          buttonTxt: '发送验证码',
          isButtonClickAble: true,
        });
      } else {
        this.setState({ buttonTxt: `${count}s 后重新发送` });
      }
    }, 1000);
  }

  // 模拟服务端验证
  validate = (phoneNumber) => {
    return new Promise((resolve) => {
      const delay = setTimeout(() => {
        if (Number(phoneNumber) === 17612771915) {
          // 请求成功
          clearTimeout(delay);
          resolve({
            code: 0,
            data: 'userId',
            info: 'success',
          });
        }
        // 请求失败
        clearTimeout(delay);
        resolve({
          code: 1,
          data: '',
          info: 'Phone number not found in database.',
        });
      }, 500);
    })
  }

  render() {

    const {
      phoneNumber,
      isButtonClickAble,
      buttonTxt,
    } = this.state;

    return (
      <div>
        <h3>业务场景：</h3>
        <div className="validate-form">
          <input
            type="number"
            value={phoneNumber}
            onChange={this.handlePhoneNumberChange}
            placeholder="请输入手机号码"
          />
          <br/>
          <Button
            disabled={!isButtonClickAble}
            onClick={this.handleValidateClick}
          >
            {buttonTxt}
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
