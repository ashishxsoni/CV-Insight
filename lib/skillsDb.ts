import type { SkillEntry } from "@/types";

/**
 * Curated skills dictionary used for rule-based extraction.
 * Aliases list covers common abbreviations, typos and alternate terms.
 */
export const SKILLS_DB: SkillEntry[] = [
  // ── Programming Languages ──────────────────────────────────────────────
  { canonical: "Java", aliases: ["core java", "java se", "java ee", "j2ee", "j2se"], category: "programming" },
  { canonical: "Python", aliases: ["python3", "python 3", "py"], category: "programming" },
  { canonical: "JavaScript", aliases: ["js", "javascript", "ecmascript", "es6", "es2015", "es2020"], category: "programming" },
  { canonical: "TypeScript", aliases: ["ts", "typescript"], category: "programming" },
  { canonical: "C", aliases: [" c ", "c language", "c programming"], category: "programming" },
  { canonical: "C++", aliases: ["c plus plus", "cpp", "c/c++"], category: "programming" },
  { canonical: "C#", aliases: ["csharp", "c sharp", ".net c#", "dotnet c#"], category: "programming" },
  { canonical: "Go", aliases: ["golang", "go lang"], category: "programming" },
  { canonical: "Rust", aliases: ["rust lang", "rust programming"], category: "programming" },
  { canonical: "Kotlin", aliases: ["kotlin lang"], category: "programming" },
  { canonical: "Swift", aliases: ["swift lang", "apple swift"], category: "programming" },
  { canonical: "PHP", aliases: ["php7", "php8", "hypertext preprocessor"], category: "programming" },
  { canonical: "Ruby", aliases: ["ruby on rails language", "rb"], category: "programming" },
  { canonical: "Scala", aliases: ["scala lang"], category: "programming" },
  { canonical: "Fortran", aliases: ["fortran 77", "fortran 90", "f90"], category: "programming" },
  { canonical: "Bash", aliases: ["bash scripting", "bash shell", "shell script", "unix shell scripting", "shell scripting"], category: "programming" },
  { canonical: "PowerShell", aliases: ["powershell scripting", "ps1"], category: "programming" },
  { canonical: "MATLAB", aliases: ["matlab"], category: "programming" },
  { canonical: "R", aliases: ["r language", "r programming", "r studio"], category: "programming" },

  // ── Web / Frontend Frameworks ─────────────────────────────────────────
  { canonical: "React", aliases: ["reactjs", "react.js", "react js", "react native"], category: "framework" },
  { canonical: "Angular", aliases: ["angularjs", "angular.js", "angular 2", "angular js"], category: "framework" },
  { canonical: "Vue.js", aliases: ["vuejs", "vue js", "vue 3", "vue 2"], category: "framework" },
  { canonical: "Next.js", aliases: ["nextjs", "next js"], category: "framework" },
  { canonical: "Nuxt.js", aliases: ["nuxtjs", "nuxt js"], category: "framework" },
  { canonical: "jQuery", aliases: ["jquery", "jquery js"], category: "framework" },
  { canonical: "HTML", aliases: ["html5", "html 5", "hypertext markup"], category: "framework" },
  { canonical: "CSS", aliases: ["css3", "css 3"], category: "framework" },
  { canonical: "Tailwind CSS", aliases: ["tailwindcss", "tailwind"], category: "framework" },
  { canonical: "Bootstrap", aliases: ["bootstrap css", "bootstrap 4", "bootstrap 5"], category: "framework" },

  // ── Backend Frameworks ────────────────────────────────────────────────
  { canonical: "Spring Boot", aliases: ["spring-boot", "springboot", "spring framework", "spring mvc", "spring core"], category: "framework" },
  { canonical: "Node.js", aliases: ["nodejs", "node js", "node express", "expressjs"], category: "framework" },
  { canonical: "Express.js", aliases: ["express.js", "express js", "expressjs", "express framework", "express backend"], category: "framework" },
  { canonical: "Playwright", aliases: ["playwright testing", "playwright automation", "playwright & cypress", "playwright js"], category: "framework" },
  { canonical: "Cypress", aliases: ["cypress testing", "cypress automation", "cypress.io"], category: "framework" },
  { canonical: "Socket.io", aliases: ["socketio", "socket io", "socket.io", "websocket socket"], category: "framework" },
  { canonical: "Redux Toolkit", aliases: ["redux-toolkit", "redux toolkit", "redux", "reduxjs"], category: "framework" },
  { canonical: "Prisma", aliases: ["prisma orm", "prisma client"], category: "database" },
  { canonical: "Django", aliases: ["django rest", "drf", "django framework"], category: "framework" },
  { canonical: "Flask", aliases: ["flask python", "flask api"], category: "framework" },
  { canonical: "FastAPI", aliases: ["fast api", "fastapi python"], category: "framework" },
  { canonical: "Ruby on Rails", aliases: ["rails", "ror", "ruby rails"], category: "framework" },
  { canonical: ".NET", aliases: ["dotnet", ".net core", "asp.net", "asp.net core", "asp net", "aspnet"], category: "framework" },
  { canonical: "Laravel", aliases: ["laravel php"], category: "framework" },
  { canonical: "gRPC", aliases: ["grpc", "g rpc", "rest/grpc", "grpc api"], category: "framework" },

  // ── Databases ─────────────────────────────────────────────────────────
  { canonical: "MySQL", aliases: ["mysql db", "my sql"], category: "database" },
  { canonical: "PostgreSQL", aliases: ["postgres", "postgresql db", "psql"], category: "database" },
  { canonical: "MongoDB", aliases: ["mongo db", "mongodb atlas"], category: "database" },
  { canonical: "SQL Server", aliases: ["microsoft sql server", "mssql", "ms sql", "sql server"], category: "database" },
  { canonical: "Oracle DB", aliases: ["oracle database", "oracle sql", "oracle"], category: "database" },
  { canonical: "SQLite", aliases: ["sqlite3", "sqlite db"], category: "database" },
  { canonical: "Redis", aliases: ["redis cache", "redis db"], category: "database" },
  { canonical: "Elasticsearch", aliases: ["elastic search", "elasticsearch crud", "elk", "elk stack", "kibana", "logstash"], category: "database" },
  { canonical: "Cassandra", aliases: ["apache cassandra", "cassandra db"], category: "database" },
  { canonical: "DynamoDB", aliases: ["dynamo db", "aws dynamodb"], category: "database" },
  { canonical: "GraphQL", aliases: ["graph ql"], category: "database" },
  { canonical: "NoSQL", aliases: ["no sql", "non-relational db"], category: "database" },

  // ── Cloud & DevOps ────────────────────────────────────────────────────
  { canonical: "AWS", aliases: ["amazon web services", "amazon aws", "aws cloud"], category: "cloud" },
  { canonical: "Azure", aliases: ["microsoft azure", "ms azure", "azure cloud"], category: "cloud" },
  { canonical: "GCP", aliases: ["google cloud", "google cloud platform", "gcp cloud"], category: "cloud" },
  { canonical: "Docker", aliases: ["docker container", "dockerfile", "docker compose"], category: "devops" },
  { canonical: "Kubernetes", aliases: ["k8s", "kube", "kubernetes cluster"], category: "devops" },
  { canonical: "Jenkins", aliases: ["jenkins ci", "jenkins pipeline"], category: "devops" },
  { canonical: "Terraform", aliases: ["terraform iac", "hashicorp terraform"], category: "devops" },
  { canonical: "Ansible", aliases: ["ansible automation"], category: "devops" },
  { canonical: "CI/CD", aliases: ["cicd", "ci cd", "continuous integration", "continuous deployment", "devops pipeline", "devops ci"], category: "devops" },
  { canonical: "Git", aliases: ["git scm", "github", "gitlab", "bitbucket", "version control", "svn", "clearcase"], category: "devops" },
  { canonical: "Linux", aliases: ["ubuntu", "centos", "unix", "linux os", "linux environment", "unix-like systems", "linux-based"], category: "devops" },
  { canonical: "Chef", aliases: ["chef automation", "chef infra"], category: "devops" },

  // ── AI / ML ───────────────────────────────────────────────────────────
  { canonical: "Machine Learning", aliases: ["ml", "ml models", "scikit-learn", "sklearn"], category: "ai-ml" },
  { canonical: "Deep Learning", aliases: ["dl", "neural networks", "deep neural network"], category: "ai-ml" },
  { canonical: "PyTorch", aliases: ["pytorch framework"], category: "ai-ml" },
  { canonical: "TensorFlow", aliases: ["tensorflow 2", "tf"], category: "ai-ml" },
  { canonical: "AI/ML", aliases: ["artificial intelligence", "aiml", "ai ml"], category: "ai-ml" },
  { canonical: "NLP", aliases: ["natural language processing", "nlp"], category: "ai-ml" },
  { canonical: "Computer Vision", aliases: ["cv", "image processing"], category: "ai-ml" },

  // ── Mobile ────────────────────────────────────────────────────────────
  { canonical: "Android", aliases: ["android sdk", "android development"], category: "mobile" },
  { canonical: "iOS", aliases: ["ios development", "swift ios", "xcode"], category: "mobile" },
  { canonical: "Flutter", aliases: ["flutter dart", "flutter sdk"], category: "mobile" },

  // ── Concepts / Methodologies ──────────────────────────────────────────
  { canonical: "REST API", aliases: ["rest", "restful api", "rest api development", "restful web services", "restful apis", "rest/grpc apis"], category: "concept" },
  { canonical: "Microservices", aliases: ["micro services", "microservice architecture", "microservice-based"], category: "concept" },
  { canonical: "Agile", aliases: ["agile methodology", "agile programming", "agile development", "scrum", "kanban", "agile release train", "art"], category: "concept" },
  { canonical: "SDLC", aliases: ["software development lifecycle", "software development life cycle", "s.d.l.c"], category: "concept" },
  { canonical: "OOP", aliases: ["object oriented", "object-oriented programming", "oop principles", "object oriented design"], category: "concept" },
  { canonical: "TDD", aliases: ["test driven development", "test-driven development"], category: "concept" },
  { canonical: "Design Patterns", aliases: ["software architecture patterns", "software architecture principles"], category: "concept" },
  { canonical: "SQL", aliases: ["structured query language", "sql queries", "relational database", "relational databases"], category: "database" },
  { canonical: "Data Structures", aliases: ["data structure", "algorithms", "algo"], category: "concept" },
  { canonical: "HPC", aliases: ["high performance computing", "high-performance computing", "parallel programming", "mpi", "openmp"], category: "concept" },
  { canonical: "Unit Testing", aliases: ["unit test", "unit tests", "junit", "jest", "mocha", "pytest"], category: "concept" },
  { canonical: "Full-Stack Development", aliases: ["full stack", "full-stack", "fullstack"], category: "concept" },
  { canonical: "Kafka", aliases: ["apache kafka", "kafka mq", "kafka messaging"], category: "framework" },
  { canonical: "Protobuf", aliases: ["protocol buffers", "protocol buffer"], category: "concept" },
  { canonical: "YAML", aliases: ["yml"], category: "concept" },
  { canonical: "JSON", aliases: ["json format"], category: "concept" },
  { canonical: "UI/UX", aliases: ["ux design", "ui design", "user interface", "user experience", "ui/ux development"], category: "concept" },
  { canonical: "FPGA", aliases: ["fpga programming"], category: "concept" },
  { canonical: "GPU Programming", aliases: ["cuda", "opencl", "gpu"], category: "concept" },
  { canonical: "WebSockets", aliases: ["web sockets", "websocket"], category: "concept" },
  { canonical: "SignalR", aliases: ["signal r"], category: "concept" },
];

/**
 * Build a fast lookup: lowercased alias/canonical → canonical name
 */
export function buildSkillLookup(): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of SKILLS_DB) {
    map.set(entry.canonical.toLowerCase(), entry.canonical);
    for (const alias of entry.aliases) {
      map.set(alias.toLowerCase(), entry.canonical);
    }
  }
  return map;
}

export const SKILL_LOOKUP = buildSkillLookup();
