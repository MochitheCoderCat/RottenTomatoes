import React, { useEffect } from "react";
import { Form, Button, message, Input, App } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary flex flex-col items-center justify-center">
        <div>
          <h1 className="text-6xl text-green-400 font-semibold tracking-wider">
            ROTTEN POTATOES
          </h1>
          <p className="text-gray-300 mt-2 text-xl tracking-wider text-center">
            A place for picky students all around the world.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-[400px]">
          <h1 className="text-2xl mb-2">Register Your Account</h1>
          <hr />
          <Form
            layout="vertical"
            className="flex flex-col gap-5 mt-3"
            onFinish={onFinish}
          >
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>

            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>

              <Link to="/login">Already have an account? Login here.</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
