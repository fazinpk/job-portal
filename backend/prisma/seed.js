import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORY_NAMES = ["Engineering", "Design", "Product", "Marketing", "Sales", "Customer Support"];

const SAMPLE_JOBS = [
  {
    title: "Backend Engineer",
    category: "Engineering",
    experienceLevel: "MID",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 50000,
    salaryMax: 80000,
    description:
      "Join our engineering team to design and maintain scalable REST APIs. You'll work closely with the frontend and DevOps teams to ship reliable features end to end, and have real input into how our backend architecture evolves.",
  },
  {
    title: "Frontend Engineer",
    category: "Engineering",
    experienceLevel: "MID",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 45000,
    salaryMax: 70000,
    description:
      "We're looking for someone who enjoys turning designs into fast, accessible interfaces. Experience with React and modern CSS tooling is a big plus, and you'll have a direct say in our component architecture.",
  },
  {
    title: "Senior Backend Engineer",
    category: "Engineering",
    experienceLevel: "SENIOR",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 90000,
    salaryMax: 130000,
    description:
      "Lead the design of our core services, mentor junior engineers, and help shape our approach to reliability and performance as we scale beyond our current user base.",
  },
  {
    title: "DevOps Engineer",
    category: "Engineering",
    experienceLevel: "SENIOR",
    employmentType: "FULL_TIME",
    status: "DRAFT",
    salaryMin: 80000,
    salaryMax: 110000,
    description:
      "Own our CI/CD pipelines and cloud infrastructure. You'll help the team move faster while keeping deployments safe, observable, and easy to roll back when something goes wrong.",
  },
  {
    title: "QA Engineer Intern",
    category: "Engineering",
    experienceLevel: "ENTRY",
    employmentType: "INTERNSHIP",
    status: "PUBLISHED",
    salaryMin: 15000,
    salaryMax: 20000,
    description:
      "A hands-on internship for someone starting out in software testing. You'll write test cases, report bugs clearly, and learn how a real engineering team ships quality code under deadlines.",
  },
  {
    title: "Product Designer",
    category: "Design",
    experienceLevel: "MID",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 50000,
    salaryMax: 75000,
    description:
      "Shape the end-to-end experience of our platform, from early wireframes to polished, production-ready UI. A portfolio showing real shipped work is required.",
  },
  {
    title: "UX Researcher",
    category: "Design",
    experienceLevel: "ENTRY",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 30000,
    salaryMax: 45000,
    description:
      "Help us understand our users through interviews, surveys, and usability testing, and turn what you learn into product decisions the whole team can act on.",
  },
  {
    title: "Product Manager",
    category: "Product",
    experienceLevel: "SENIOR",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 100000,
    salaryMax: 140000,
    description:
      "Own the roadmap for one of our core product areas, working closely with engineering and design to ship features that genuinely move the needle for our users.",
  },
  {
    title: "Associate Product Manager",
    category: "Product",
    experienceLevel: "ENTRY",
    employmentType: "FULL_TIME",
    status: "CLOSED",
    salaryMin: 40000,
    salaryMax: 55000,
    description:
      "A great entry point into product management, supporting a senior PM on discovery, planning, and shipping smaller features end to end. This role has since been filled.",
  },
  {
    title: "Content Marketing Lead",
    category: "Marketing",
    experienceLevel: "LEAD",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 70000,
    salaryMax: 95000,
    description:
      "Plan and execute our content strategy across blog, email, and social. You'll work closely with design and product marketing to tell our story well and consistently.",
  },
  {
    title: "Marketing Intern",
    category: "Marketing",
    experienceLevel: "ENTRY",
    employmentType: "INTERNSHIP",
    status: "PUBLISHED",
    salaryMin: 10000,
    salaryMax: 15000,
    description:
      "Support our marketing team with campaign research, content drafts, and social scheduling. A solid way to get real experience in a fast-moving team.",
  },
  {
    title: "Sales Executive",
    category: "Sales",
    experienceLevel: "MID",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 35000,
    salaryMax: 55000,
    description:
      "Drive new business by building relationships with prospective customers and guiding them through the sales cycle, from the first call to closing the deal.",
  },
  {
    title: "Enterprise Sales Lead",
    category: "Sales",
    experienceLevel: "LEAD",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 90000,
    salaryMax: 120000,
    description:
      "Own relationships with our largest customers and lead complex, multi-stakeholder deals from prospecting through renewal, working closely with our customer success team.",
  },
  {
    title: "Customer Support Associate",
    category: "Customer Support",
    experienceLevel: "ENTRY",
    employmentType: "PART_TIME",
    status: "PUBLISHED",
    salaryMin: 18000,
    salaryMax: 25000,
    description:
      "Be the first point of contact for our customers, resolving issues over chat and email and knowing when to escalate the tricky ones to engineering.",
  },
  {
    title: "Support Team Lead",
    category: "Customer Support",
    experienceLevel: "LEAD",
    employmentType: "FULL_TIME",
    status: "PUBLISHED",
    salaryMin: 60000,
    salaryMax: 80000,
    description:
      "Lead a small team of support associates, set the bar for response quality, and work with product to fix the issues customers run into most often.",
  },
];

async function main() {
  const admin = await prisma.admin.upsert({
    where: { email: "admin@jobportal.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@jobportal.com",
      password: await bcrypt.hash("Admin@1234", 10),
    },
  });

  for (const name of CATEGORY_NAMES) {
    await prisma.category.upsert({ where: { name }, update: {}, create: { name } });
  }
  const categories = await prisma.category.findMany();
  const categoryIdByName = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const existingJobCount = await prisma.job.count();
  if (existingJobCount > 0) {
    console.log(`Skipping sample jobs — ${existingJobCount} job(s) already exist.`);
  } else {
    for (const job of SAMPLE_JOBS) {
      await prisma.job.create({
        data: {
          title: job.title,
          description: job.description,
          location: "Kochi, India",
          categoryId: categoryIdByName[job.category],
          experienceLevel: job.experienceLevel,
          employmentType: job.employmentType,
          status: job.status,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          createdById: admin.id,
        },
      });
    }
    console.log(`Seeded ${SAMPLE_JOBS.length} jobs.`);
  }

  console.log("Seed complete. Admin login: admin@jobportal.com / Admin@1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
