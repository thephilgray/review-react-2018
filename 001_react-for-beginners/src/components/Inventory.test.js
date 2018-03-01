import React from "react";
import { shallow } from "enzyme";

import Inventory from "./Inventory";

const inventory = shallow(<Inventory />);

it("renders", () => {
  expect(inventory).toMatchSnapshot();
});
