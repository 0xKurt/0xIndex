import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function populateBlockchains(json) {
  for (const blockchain of json) {
    await prisma.blockchain.create({
      data: {
        name: blockchain.name,
        image: blockchain.image,
        chainId: blockchain.chainId,
      },
    });
  }
}

export const createCategories = async (categories) => {
  const categoryObjects = categories.map(({ name, shortName }) => ({
    name,
    shortName,
  }));

  await prisma.category.createMany({
    data: categoryObjects,
  });
};

export const addProjectsToDatabase = async (projects) => {
  for (const project of projects) {
    const existingBlockchains = await prisma.blockchain.findMany({
      where: {
        name: {
          in: project.blockchains,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const existingCategories = await prisma.category.findMany({
      where: {
        name: {
          in: project.categories,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        image: project.image,
        link: project.link,
        dateAdded: project.dateAdded,
        rating: project.rating,
        categories: {
          connect: existingCategories.map((c) => ({ id: c.id })),
        },
        blockchains: {
          connect: existingBlockchains.map((b) => ({ id: b.id })),
        },
      },
    });
  }
};

export const updateRating = async () => {
  const projects = await prisma.project.findMany();

  const maxRating = await prisma.project
    .aggregate({
      _max: {
        rating: true,
      },
    })
    .then((result) => result._max.rating);

  const numSteps = 1000n;

  // Loop over all projects and assign them to a step
  for (const project of projects) {
    // Calculate the percentage of rating
    const clickPercent = (project.rating * numSteps) / maxRating;

    // Calculate the step number
    let step = Math.floor(Number(clickPercent));
    // Assign the project to the corresponding step

    if (step === 0) {
      step = 1000;
      // console.log(project.name);
      // console.log(clickPercent);
      // console.log(step);
      // console.log(project.rating)
      if (project.rating === 0) {
        console.log("zero rating");
      }
    }
    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        rating: project.rating === 0n ? 0 : Number(numSteps) - step,
      },
    });
  }
};

export async function updateRatingByName(name, rating) {
  const projects = await prisma.project.findMany({
    where: {
      name: name,
    },
  });

  if (projects.length === 0) {
    return;
    throw new Error(`No project found with name ${name}`);
  } else if (projects.length > 1) {
    return;
    throw new Error(`Multiple projects found with name ${name}`);
  }

  const projectId = projects[0].id;

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      rating: Number(rating) || 0,
    },
  });

  return project;
}

export const linkDupes = async () => {
  const projectsWithLinkDupe = await prisma.project.groupBy({
    by: ["link"],
    having: {
      link: {
        _count: {
          gt: 1,
        },
      },
    },
    select: {
      link: true,
      _count: true,
    },
  });

  console.log(projectsWithLinkDupe);
  // const deletePromises = [];

  // for (const { link, _count, projects } of dupeLinks) {
  //   if (_count > 1) {
  //     const sortedProjects = projects.sort((a, b) => {
  //       if (a.rating !== b.rating) {
  //         return b.rating - a.rating;
  //       } else {
  //         return b.id - a.id;
  //       }
  //     });

  //     const toDelete = sortedProjects.slice(1).map((p) => ({ id: p.id }));

  //     const deletePromise = prisma.project.deleteMany({
  //       where: {
  //         AND: [
  //           {
  //             link,
  //           },
  //           {
  //             OR: toDelete,
  //           },
  //         ],
  //       },
  //     });

  //     deletePromises.push(deletePromise);
  //   }
  // }

  // await Promise.all(deletePromises);
};


export const projectPerCategoryCount = async () => {
  const blockchainId = 1; // replace with the ID of the blockchain you want to filter by
  const res = await prisma.blockchain.findMany({
    where: {
      id: blockchainId,
    },
    include: {
      projects: {
        include: {
          categories: true,
        },
      },
    },
  });

  const groupedProjects = res[0].projects.reduce((result, project) => {
    project.categories.forEach((category) => {
      const key = category.name;
      result[key] = result[key] || [];
      result[key].push(project);
    });
    return result;
  }, {});

  // const categories = res.flatMap((blockchain) =>
  //   blockchain.projects.flatMap((project) => project.categories),
  // );

  // const categoryCounts = categories.reduce((acc, category) => {
  //   const id = category.id;
  //   if (id in acc) {
  //     acc[id].count += 1;
  //   } else {
  //     acc[id] = {
  //       name: category.name,
  //       count: 1,
  //     };
  //   }
  //   return acc;
  // }, {});

  // console.log(res);
  // console.log(res[0].projects[0][0]);
  // console.log(res[0].projects[0].categories);

};
