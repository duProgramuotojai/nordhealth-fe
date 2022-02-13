import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

const notificationRoot = document.getElementById("notification-root");

interface IProps {}

class NotificationView extends React.Component<IProps> {
  private el: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    notificationRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    notificationRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export { NotificationView };
