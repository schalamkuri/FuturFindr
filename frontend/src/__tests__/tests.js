import renderer from "react-test-renderer";

import JobCard from "../components/JobCard";
import HousingCard from "../components/HousingCard";
import CollegeCard from "../components/CollegeCard";
import DevCard from "../components/DevCard";
import ToolCard from "../components/ToolCard";
import APICard from "../components/APICard"
import NavigationBar from "../components/NavigationBar";
import About from "../Views/about";

import CollegeInstance from "../Views/CollegeInstance";
import HousingInstance from "../Views/HousingInstance";
import RouteSwitch from "../RouteSwitch";
import App from "../App";

// import placeholder from "../assets/placeholder/avatar.png";
// import App from "../App";
// import RouteSwitch from "../RouteSwitch";

it("CollegeCard Initial correctly", () => {
  const college = {
    name : "name",
    instateTuition : "instateTuition",
    outstateTuition : "outstateTuition",
    admissionRate: "admissionRate",
    city: "city",
    img_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.utexas.edu%2Fabout%2Foverview&psig=AOvVaw285B_AsAjQqCavtg_9SRdT&ust=1678332012643000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjVp42wy_0CFQAAAAAdAAAAABAE",
  };
  const component = renderer.create(<CollegeCard college={college} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("HousingCard initializes correctly", () => {
  const housing = {
    address: "address",
    type: "type",
    city: "city",
    price: 1000,
    beds: 5,
    baths: 2,
  };
  const component = renderer.create(<HousingCard housing={housing} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



it("JobCard initializes correctly", () => {
  const job = {
    title: "title",
    company: "company",
    category: "category",
    location: 'location',
    id: "id"
  };
  const component = renderer.create(<JobCard job={job} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("DevCard initializes correctly", () => {
  const dev = {
    pic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.utexas.edu%2Fabout%2Foverview&psig=AOvVaw285B_AsAjQqCavtg_9SRdT&ust=1678332012643000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjVp42wy_0CFQAAAAAdAAAAABAE",
    name: "name",
    role: "role",
    bio: "bio",
    gitlab: "gitlab",
    commits: "commits"
  };
  const component = renderer.create(<DevCard dev={dev} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("ToolCard initializes correctly", () => {
  const tool = {
    name: "name",
    role: "role",
    bio: "bio",
    gitlab: "gitlab",
    commits: "commits"
  };
  const component = renderer.create(<ToolCard tool={tool} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("APICard initializes correctly", () => {
  const api = {
    name: "name",
    role: "role",
    bio: "bio",
    gitlab: "gitlab",
    commits: "commits"
  };
  const component = renderer.create(<APICard api={api} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("NavigationBar initializes correctly", () => {
  const component = renderer.create(<NavigationBar />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("About initializes correctly", () => {
  const component = renderer.create(<About />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// it("CollegeInstance Initial correctly", () => {
//   const college = {
//     name : "name",
//     instateTuition : "instateTuition",
//     outstateTuition : "outstateTuition",
//     admissionRate: "admissionRate",
//     city: "city",
//     img_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.utexas.edu%2Fabout%2Foverview&psig=AOvVaw285B_AsAjQqCavtg_9SRdT&ust=1678332012643000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjVp42wy_0CFQAAAAAdAAAAABAE",
//   };
//   const component = renderer.create(<CollegeInstance college={college} />);

//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

it("RouteSwitch initializes correctly", () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


it("RouteSwitch initializes correctly", () => {
  const component = renderer.create(<RouteSwitch />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// it("HousingCard initializes correctly", () => {
//   const housing = {
//     address: "address",
//     type: "type",
//     city: "city",
//     price: 1000,
//     beds: 5,
//     baths: 2,
//   };
//   const component = renderer.create(<HousingInstance housing={housing} />);

//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

