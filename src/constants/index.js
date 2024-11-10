import project1 from "../assets/Forecast-hub.mp4";
import project2 from "../assets/modern-ui.mp4";
import project3 from "../assets/Expense Manager.mp4";

export const HERO_CONTENT = `Hi, I’m Sai Rithwik Kukunuri, an Honors undergraduate student at Arizona State University, majoring in Computer Science (Software Engineering) with a Minor in Data Science. I’m passionate about developing innovative software solutions, leveraging data for impactful decision-making, and continuously refining my technical skills to solve real-world challenges.`;

export const ABOUT_TEXT = `
I still remember the excitement of writing my very first program—it sparked a passion for coding and 
problem-solving that has only grown since. As a Computer Science (Software Engineering) student with a Minor in Data Science 
at Arizona State University, I am always looking for opportunities to apply my skills and build software 
that can make a difference.My interests span across full-stack development and machine learning, where 
I enjoy creating projects that blend creativity with technical problem-solving. I am also deeply interested 
in how technology can drive value and innovation in various fields, which fuels my desire to work on
projects that not only solve problems but also contribute to larger goals. Whether it's building 
applications, improving machine learning models, or collaborating on innovative solutions, I am eager 
to continue growing, learning, and contributing to impactful projects.
`;

export const EXPERIENCES = [
  {
    year: "2022 - Present",
    role: "Coach | Social Media Team Graphic Designer | SAT Bootcamp Guide ",
    company: " Schoolhouse.world",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Tutoring", "Onboarding Tutors", "Graphic Design"],
  },
  {
    year: "June 2023 - July 2023",
    role: "Project Lead",
    company: "Excelerate",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "June 2023 - July 2023",
    role: "Project Manager",
    company: "Excelerate",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
];

export const PROJECTS = [
  {
    title: "Forecast-Hub",
    image: project1,
    description:
      "Forecast Hub is a sleek weather app powered by an API, providing real-time updates on wind speed and humidity for any location you search. Stay informed and plan your activities with confidence!",
    technologies: ["HTML", "CSS", "JavaScript", "Open Weather API"],
    codeUrl: "https://github.com/YB-Yottabyte/Forecast-Hub",
    demoUrl: "https://yb-yottabyte.github.io/Forecast-Hub/",

  },

  {
    title: "Personal Finance Manager",
    image: project3,
    description:
      "A Java-based Personal Finance Manager that allows users to log and manage expenses, set budgets, and store data persistently across sessions. Current features include adding, viewing, and removing expenses, with future enhancements planned for a React-based frontend and interactive graphical expense visualization using JavaFX.",
    technologies: ["Java", "Java Swing"],
    codeUrl: "https://github.com/YB-Yottabyte/personal-finance-manager",
    demoUrl: "https://youtu.be/nX4Pcbg-uWk?si=5a488vsHnDRlu3IV",
  },

  {
    title: "Modern UI-UX",
    image: project2,
    description:
      "I have built a responsive web application using React, featuring a stunning hero section, high-quality images, and appealing gradients.",
    technologies: ["React JS", "Framer Motion", "Tailwind CSS"],
    codeUrl: "https://github.com/YB-Yottabyte/Modern-UI-UX",
    demoUrl: "https://nextgenreact-ui.netlify.app/",
  },

];




