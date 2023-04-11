import axios from "axios";

export const backendApi = axios.create({ baseURL: "https://api.futurfindr.me/", });

export const categories = [
    "Accounting & Finance Jobs",
    "Admin Jobs",
    "Creative & Design Jobs",
    "Customer Services Jobs",
    "Domestic help & Cleaning Jobs",
    "Engineering Jobs",
    "Healthcare & Nursing Jobs",
    "Hospitality & Catering Jobs",
    "HR & Recruitment Jobs",
    "IT Jobs",
    "Legal Jobs",
    "Logistics & Warehouse Jobs",
    "Maintenance Jobs",
    "Manufacturing Jobs",
    "Part time Jobs",
    "PR, Advertising & Marketing Jobs",
    "Retail Jobs",
    "Sales Jobs",
    "Scientific & QA Jobs",
    "Social work Jobs",
    "Teaching Jobs",
    "Trade & Construction Jobs",
    "Travel Jobs",
];

