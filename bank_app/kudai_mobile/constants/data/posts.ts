import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import fs from "fs";

export const generatePosts = (numPosts = 10) => {
  const posts = [];
  const users = [];

  const generateRandomId = () => Math.floor(Math.random() * 1000).toString();

  // Generate random users
  for (let i = 0; i < 10; i++) {
    users.push({
      id: generateRandomId(),
      username: faker.internet.userName(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
    });
  }

  // Generate random posts
  for (let i = 0; i < numPosts; i++) {
    const postId = generateRandomId();
    const doctorId = users[Math.floor(Math.random() * users.length)].id;
    const postComments = [];
    const postLikes = [];

    // Generate random comments for each post
    const numComments = Math.floor(Math.random() * 10);
    for (let j = 0; j < numComments; j++) {
      postComments.push({
        id: generateRandomId(),
        postId: postId,
        userId: users[Math.floor(Math.random() * users.length)].id,
        content: faker.lorem.sentence(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      });
    }

    // Generate random likes for each post
    const numLikes = Math.floor(Math.random() * 100);
    for (let k = 0; k < numLikes; k++) {
      postLikes.push({
        id: generateRandomId(),
        postId: postId,
        userId: users[Math.floor(Math.random() * users.length)].id,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        likeUser: users[Math.floor(Math.random() * users.length)],
      });
    }

    posts.push({
      id: postId,
      doctorId: doctorId,
      title: faker.lorem.words(3),
      image: faker.image.url(),
      description: faker.lorem.paragraph(),
      likesCount: numLikes,
      status: "ACTIVE",
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      postComments: postComments,
      postLikes: postLikes,
      postDoctor: users.find((user) => user.id === doctorId),
    });
  }

  // const data = {
  //   status: true,
  //   message: "Mock data generated successfully",
  //   data: {
  //     posts: posts,
  //   },
  // };

  // fs.writeFileSync("constants/data/mockPosts.json", JSON.stringify(data, null, 2));
  // console.log("Mock data generated successfully!");

  return posts
};

// generatePosts();
