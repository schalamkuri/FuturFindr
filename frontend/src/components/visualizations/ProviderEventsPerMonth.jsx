import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { providerApi } from "../../Assets/Data/Constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// helper function to get month name from number.
// Not mine!! found at https://codingbeautydev.com/blog/javascript-convert-month-number-to-name/
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'long' });
  }  

function ProviderEventsPerMonth() {
    /* State */
    const [numEventsList] = useState({});
    const [finalList] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getNumEventsList = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            var month
            // load dict with months
            for (let i = 1; i < 13; i++) {
                month = getMonthName(i)
                numEventsList[month] = 0
            }
            // Call api
            const response = await providerApi.get("events")
            for (const event of response.data.data) {
                month = getMonthName(event.local_date.split("-")[1])
                numEventsList[month] += 1
            }
            for (const element in numEventsList) {
                finalList.push({month: element, num_events: numEventsList[element]})
            }
            setLoad(true);
        }
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        if (!x) {
            getNumEventsList();
            x = true;
        }
    }, [finalList, load]);

    return (
        <div>
        {load ? (
        <Container fluid="md">
        <Row style={{ width: "100%", height: 600 }}>
            <h3 className="p-5 text-center">Events Per Month</h3>
            <Col>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={finalList}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="num_events" fill="#2785c9" />
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


export default ProviderEventsPerMonth;