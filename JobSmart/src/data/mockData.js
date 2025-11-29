export const MOCK_CANDIDATE = {
  name: "Alex Developer",
  email: "alex@example.com",
  title: "Frontend Engineer",
  skills: ["React", "JavaScript", "CSS", "Node.js", "UX Design"],
  bio: "Passionate developer with 4 years of experience building responsive web applications.",
};

export const MOCK_RECRUITER = {
  name: "Sarah Recruiter",
  company: "TechNova",
  email: "sarah@technova.com",
};

export const INITIAL_JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    tags: ["React", "Redux", "TypeScript"],
    description:
      "We are looking for an experienced React developer to lead our frontend team.",
    applicants: 12,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80/hr",
    tags: ["Figma", "Adobe XD", "CSS"],
    description:
      "Join our creative team to design stunning user interfaces for mobile and web apps.",
    applicants: 5,
  },
  {
    id: 3,
    title: "Junior Frontend Engineer",
    company: "Webify Inc.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$70k - $90k",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "Perfect role for a boot camp grad or junior dev looking to grow their skills.",
    applicants: 24,
  },
];

export const INITIAL_APPLICATIONS = [
  {
    id: 101,
    jobId: 1,
    candidateName: "John Smith",
    jobTitle: "Senior React Developer",
    company: "TechNova",
    status: "Screening",
    date: "2023-10-22",
  },
  {
    id: 102,
    jobId: 2,
    candidateName: "Jane Doe",
    jobTitle: "UI/UX Designer",
    company: "Creative Studio",
    status: "Applied",
    date: "2023-10-24",
  },
  {
    id: 103,
    jobId: 1,
    candidateName: "Alex Developer",
    jobTitle: "Senior React Developer",
    company: "TechNova",
    status: "Interview",
    date: "2023-10-15",
  },
];
