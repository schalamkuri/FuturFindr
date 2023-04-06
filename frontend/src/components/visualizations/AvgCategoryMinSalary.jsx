import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const data = [
    {
        category: "Teaching Jobs",
        avg_min_salary: 41158.84403669725
    },
    {
        category: "Healthcare & Nursing Jobs",
        avg_min_salary: 55107.914893617024
    },
    {
        category: "Travel Jobs",
        avg_min_salary: 62351.416666666664
    },
    {
        category: "Energy, Oil & Gas Jobs",
        avg_min_salary: 64498.57142857143
    },
    {
        category: "IT Jobs",
        avg_min_salary: 84752.52777777778
    },
    {
        category: "Accounting & Finance Jobs",
        avg_min_salary: 65876.52380952382
    },
    {
        category: "Logistics & Warehouse Jobs",
        avg_min_salary: 65640.57294429708
    },
    {
        category: "Customer Services Jobs",
        avg_min_salary: 28940.32
    },
    {
        category: "Admin Jobs",
        avg_min_salary: 40741.10810810811
    },
    {
        category: "Sales Jobs",
        avg_min_salary: 45463.8202247191
    },
    {
        category: "Hospitality & Catering Jobs",
        avg_min_salary: 26715.235294117647
    },
    {
        category: "PR, Advertising & Marketing Jo",
        avg_min_salary: 56318.181818181816
    },
    {
        category: "HR & Recruitment Jobs",
        avg_min_salary: 58184.1
    },
    {
        category: "Engineering Jobs",
        avg_min_salary: 56280.31578947369
    },
    {
        category: "Consultancy Jobs",
        avg_min_salary: 93450.0
    },
    {
        category: "Creative & Design Jobs",
        avg_min_salary: 50987.71428571428
    },
    {
        category: "Retail Jobs",
        avg_min_salary: 31424.0
    },
    {
        category: "Maintenance Jobs",
        avg_min_salary: 34173.89473684211
    },
    {
        category: "Scientific & QA Jobs",
        avg_min_salary: 53573.333333333336
    },
    {
        category: "Trade & Construction Jobs",
        avg_min_salary: 45922.5
    },
    {
        category: "Legal Jobs",
        avg_min_salary: 96709.33333333333
    },
    {
        category: "Manufacturing Jobs",
        avg_min_salary: 34051.42857142857
    },
    {
        category: "Social work Jobs",
        avg_min_salary: 39440.0
    },
    {
        category: "Property Jobs",
        avg_min_salary: 65000.0
    },
    {
        category: "Domestic help & Cleaning Jobs",
        avg_min_salary: 31680.0
    },
    {
        category: "Other/General Jobs",
        avg_min_salary: 47460.0
    }
];

const AvgCategoryMinSalary = () => {
    return (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center">Average yearly salary for each job category</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
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