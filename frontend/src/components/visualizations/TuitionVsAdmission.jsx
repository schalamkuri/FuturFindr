import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { backendApi } from "../../Assets/Data/Constants";
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

// Inspired by GeoJobs

function TuitionVsAdmission() {
    /* State */
    const [data] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getData = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            // Call api - get 300 colleges
            const response = await backendApi.get("colleges?page=2&per_page=300")
            response.data.data.forEach((college) => {
                if (college.instate_tuition != null && college.admission_rate != null) {
                    data.push({name: college.name, tuition: college.instate_tuition, admission_rate: college.admission_rate})
                }
            })
            setLoad(true);
        }
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        if (!x) {
            getData();
            x = true;
        }
    }, [data, load]);

    return (
        <div>
        {load ? (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center">College Tuition Rate vs Admission Rate</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            width={400}
                            height={400}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="tuition" name="In-state Tuition Rate" unit="$" />
                            <YAxis type="number" dataKey="admission_rate" name="Admission Rate" />
                            <ZAxis dataKey="name" name="Name"/>
                            <Tooltip labelFormatter={() => { return ''; }} cursor={{ strokeDasharray: '3 3' }}/>
                            <Scatter name="Names" data={data} fill="#2785c9" />
                        </ScatterChart>
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


export default TuitionVsAdmission;