import { notification } from "antd";
import { CheckCircleOutlined, FrownOutlined } from "@ant-design/icons";

const openNotification = (message: string, description: string) => {
  notification.open({
    message,
    description,
    duration: 7,
    icon: message.toLowerCase().includes("success") ? (
      <CheckCircleOutlined style={{ color: "green" }} />
    ) : (
      <FrownOutlined style={{ color: "red" }} />
    ),
    placement: "topLeft",
  });
};

export default openNotification;
