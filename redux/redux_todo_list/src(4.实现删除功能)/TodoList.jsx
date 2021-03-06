import React from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./store";
import { CHNAGE_INTUT_VALUE, ADD_ITEM, DELETE_ITEM } from "./store/actionTypes";
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // subscribe 监听store的变化
    store.subscribe(this.handleStoreChange); // 注意要把方法绑定
  }
  render() {
    return (
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>
        <div>
          <Input
            value={this.state.inputValue}
            placeholder="todoList"
            style={{ width: "300px", marginRight: "20px" }}
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleAddItem}>
            提交
          </Button>
          <List
            style={{ marginTop: "10px", width: "300px" }}
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => {
                  this.handleDelete(index);
                }}
              >
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
  handleInputChange(e) {
    const action = {
      type: CHNAGE_INTUT_VALUE,
      value: e.target.value
    };
    store.dispatch(action);
  }
  // store发生变化 重新获取赋值
  handleStoreChange() {
    this.setState(store.getState());
  }
  // 增加一条信息
  handleAddItem() {
    const action = {
      type: ADD_ITEM
    };
    store.dispatch(action);
  }
  // 删除一条信息
  handleDelete(index) {
    const action = {
      type: DELETE_ITEM,
      index
    };
    store.dispatch(action);
  }
}

export default TodoList;
