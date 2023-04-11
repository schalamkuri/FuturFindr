import Container from "react-bootstrap/Container";
import axios from "axios"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

// Inspired by GeoJobs

var data1 = [
    {
        category: "Accounting & Finance Jobs",
        avg_min_salary: 0
    },
    {
        category: "Admin Jobs",
        avg_min_salary: 0
    },
    {
        category: "Creative & Design Jobs",
        avg_min_salary: 0
    },
    {
        category: "Customer Services Jobs",
        avg_min_salary: 0
    },
    {
        category: "Domestic help & Cleaning Jobs",
        avg_min_salary: 0
    },
    {
        category: "Engineering Jobs",
        avg_min_salary: 0
    },
    {
        category: "Healthcare & Nursing Jobs",
        avg_min_salary: 0
    },
    {
        category: "Hospitality & Catering Jobs",
        avg_min_salary: 0
    },
    {
        category: "HR & Recruitment Jobs",
        avg_min_salary: 0
    },
    {
        category: "IT Jobs",
        avg_min_salary: 0
    },
    {
        category: "Legal Jobs",
        avg_min_salary: 0
    },
    {
        category: "Logistics & Warehouse Jobs",
        avg_min_salary: 0
    },
    {
        category: "Maintenance Jobs",
        avg_min_salary: 0
    },
    {
        category: "Manufacturing Jobs",
        avg_min_salary: 0
    },
    {
        category: "Part time Jobs",
        avg_min_salary: 0
    },
    {
        category: "PR, Advertising & Marketing Jobs",
        avg_min_salary: 0
    },
    {
        category: "Retail Jobs",
        avg_min_salary: 0
    },
    {
        category: "Sales Jobs",
        avg_min_salary: 0
    },
    {
        category: "Scientific & QA Jobs",
        avg_min_salary: 0
    },
    {
        category: "Social work Jobs",
        avg_min_salary: 0
    },
    {
        category: "Teaching Jobs",
        avg_min_salary: 0
    },
    {
        category: "Trade & Construction Jobs",
        avg_min_salary: 0
    },
    {
        category: "Travel Jobs",
        avg_min_salary: 0
    }
];

const backendApi = axios.create({ baseURL: "https://api.futurfindr.me/", });
let x = false

const fetchRepoData = async () => {
    // Code that makes it so this can only be called once
    if (x === false) {
        x = true
    } else {
        return
    }

    var num_results = 0
    var curr_avg = 0

    // Call api - for each job type, add together all salaries and save average
    // in data
    data1.forEach(job_category => {
        backendApi.get("jobs?category=" + job_category.category.replace("&", "%26")).then((response) => {
            num_results = response.data.meta.count
            response.data.data.forEach((job) => {
                curr_avg += job.salary_min
            })
            curr_avg = Math.floor(curr_avg / num_results)
            job_category.avg_min_salary = curr_avg
            curr_avg = 0
        })
    });
}

const AvgCategoryMinSalary = () => {
    fetchRepoData()
    return (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center">Average yearly salary for each job category</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data1}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <ReferenceLine y={52919.29} stroke="#000" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avg_min_salary" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default AvgCategoryMinSalary;