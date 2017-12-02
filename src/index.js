import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Button from './components/Button'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// 该组件用来测试组件加载、销毁的边界情况
class MountTest extends Component {
  constructor() {
    super();
    this.state = {
      isAppMount: true,
    };
  }

  toggleMount = () => {
    this.setState({ isAppMount: !this.state.isAppMount });
  }

  render() {
    const { isAppMount } = this.state;
    return (
      <div className="app-container">
        <h3>加载、销毁组件测试</h3>
        <Button onClick={this.toggleMount}>
          { isAppMount ? 'Unmount' : 'Mount' }
        </Button>
        { isAppMount && <App /> }
      </div>
    );
  }
}

ReactDOM.render(
  <MountTest />,
  document.getElementById('root')
);
registerServiceWorker();
