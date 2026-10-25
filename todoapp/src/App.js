import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
  }
  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{id:number, completed: boolean}}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = this.todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントが発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントが発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });
    // 3.フォームを送信したら新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      // submitイベントの本来の動作を止める
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.handleAdd(inputElement.value);
      // 入力欄を空文字にしてリセットする
      inputElement.value = "";
    });
  }
}
