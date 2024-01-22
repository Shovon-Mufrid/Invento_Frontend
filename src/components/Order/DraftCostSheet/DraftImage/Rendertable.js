import React from "react";
import { Table, Input, Button, Space, Modal, Image } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const Rendertable = ({ List }) => {
  return (
    <div>
      {List.map((list) => {
          console.log(list.product_image)
        return (
          <Image
          src={list.product_image} 
          style={{
            width: "200px",
            height: "200px",
            marginBottom: ".5rem",
            marginRight: ".5rem",
            maxHeight: "1000px",
          }}
        
  
          />
        );
      })}
    </div>
  );
};

export default Rendertable;

