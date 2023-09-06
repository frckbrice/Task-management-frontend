import { faker } from "@faker-js/faker";

export const projectData = [
  {
    name: "New Website",
    description:
      "This project will create a new website for our company. The website will be designed to be user-friendly and informative, and it will include features such as a blog, a contact form, and an online store.",
  },
  {
    name: "Mobile App",
    description:
      "This project will create a mobile app for our customers. The app will allow customers to order products, track their orders, and get customer support.",
  },
  {
    name: "Data Visualization",
    description:
      "This project will create a data visualization tool that will allow us to visualize our data in a meaningful way. The tool will be used to identify trends, patterns, and insights in our data.",
  },
  {
    name: "Machine Learning",
    description:
      "This project will create a machine learning model that will be used to predict our customers' behavior. The model will be used to optimize our marketing campaigns and improve our customer service.",
  },
  // {
  //   name: "Chatbot",
  //   description:
  //     "This project will create a chatbot that will be used to answer our customers' questions. The chatbot will be able to answer questions about our products, services, and policies.",
  // },
];

export const members = [];

for (let i = 0; i < 5; i++) {
  members.push({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    // description: faker.lorem.sentence(),
  });
}

export const collaboProjects = [];
for (let i = 0; i < 3; i++) {
  collaboProjects.push({
    name: faker.name.firstName(),
    description: faker.lorem.paragraph(),
    // description: faker.lorem.sentence(),
  });
}

console.log("collaboProjects", collaboProjects);
