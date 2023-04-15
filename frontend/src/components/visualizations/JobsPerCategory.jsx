import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { categories, backendApi } from "../../Assets/Data/Constants";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

// Inspired by GeoJobs

function JobsPerCategory() {
    /* State */
    const [categoryList] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getCategoryList = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            // Call api - for each job type, count number of jobs
            for (const job_category of categories) {
                const response = await backendApi.get("jobs?category=" + job_category.replace("&", "%26"))
                const count = response.data.meta.count
                categoryList.push({name: job_category, count: count})
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
                <h3 className="p-5 text-center">Jobs per Job Category</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="count"
                                isAnimationActive={false}
                                data={categoryList}
                                cx="50%"
                                cy="50%"
                                outerRadius={200}
                                fill="#2785c9"
                                label
                            />
                            <Tooltip />
                        </PieChart>
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

export default JobsPerCategory;