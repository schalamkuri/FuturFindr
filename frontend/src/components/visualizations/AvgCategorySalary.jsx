import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { categories, backendApi } from "../../Assets/Data/Constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Inspired by GeoJobs

function AvgCategorySalary() {
    /* State */
    const [categoryList] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getCategoryList = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            // Call api - for each job type, find average salary
            var avg_sal = 0
            for (const job_category of categories) {
                const response = await backendApi.get("jobs?category=" + job_category.replace("&", "%26"))
                const count = response.data.meta.count
                response.data.data.forEach((job) => {
                    avg_sal += job.salary_min
                })
                avg_sal = avg_sal / count
                categoryList.push({category: job_category, avg_min_salary: Math.floor(avg_sal)})
                avg_sal = 0
            }
            setLoad(true);
        }
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        if (!x) {
            getCategoryList();
            x = true;
        }
    }, [categoryList, load]);

    return (
        <div>
        {load ? (
        <Container fluid="md">
        <Row style={{ width: "100%", height: 600 }}>
            <h3 className="p-5 text-center">Average Salary per Job Category</h3>
            <Col>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={categoryList}
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
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg_min_salary" fill="#2785c9" />
                    </BarChart>
                </ResponsiveContainer>
            </Col>
        </Row>
        </Container>
        ) : (
            <Spinner animation="border" variant="info" />
        )}
        </div>
    );
}


export default AvgCategorySalary;