import { faker } from "@faker-js/faker";

export const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Backlogs",
    tasks: [
      {
        id: "26fd50b3-3841-496e-8b32-73636f6f4197",
        name: "3% Milk",
        description: faker.lorem.paragraph(2),
      },
      {
        id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525",
        name: "Butter",
        description: faker.lorem.paragraph(2),
      },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "To Do",
    tasks: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
        description: faker.lorem.paragraph(2),
      },
      {
        id: "5bee94eb-6bde-4411-b438-1c37fa6af364",
        name: "Atomic Habits",
        description: faker.lorem.paragraph(2),
      },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "In Progress",
    tasks: [
      {
        id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc",
        name: "build the shopping cards",
        description: faker.lorem.paragraph(2),
      },
      {
        id: "d3edf796-6449-4931-a777-ff66965a025b",
        name: "Clean school shoes",
        description: faker.lorem.paragraph(2),
      },
    ],
    tint: 3,
  },

  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0t",
    name: "Completed",
    tasks: [
      {
        id: "960cbbcf-89a0-4d79-fa8e-56abbc15eacc",
        name: "Workbench",
        description: faker.lorem.paragraph(2),
      },
      {
        id: "d3edf796-6449-4931-a767-ff66965a025b",
        name: "Hammer",
        description: faker.lorem.paragraph(2),
      },
    ],
    tint: 3,
  },
];
