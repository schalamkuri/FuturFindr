import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { providerApi } from "../../Assets/Data/Constants";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

function ProviderPlayersPerPosition() {
    /* State */
    const [numPlayersList, setNumPlayersList] = useState({});
    const [finalList, setfinalList] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getNumPlayersList = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            // Call api
            const response = await providerApi.get("players")
            for (const player of response.data.data) {
                if (!numPlayersList[player.position]) {
                    numPlayersList[player.position] = 1
                } else {
                    numPlayersList[player.position] += 1
                }
            }
            for (const element in numPlayersList) {
                finalList.push({name: element, num_players: numPlayersList[element]})
            }
            setLoad(true);
        }
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        if (!x) {
            getNumPlayersList();
            x = true;
        }
    }, [finalList, load]);

    return (
        <div>
        {load ? (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center">Players per Position</h3>
                <Col>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="num_players"
                                isAnimationActive={false}
                                data={finalList}
                                cx="50%"
                                cy="50%"
                                outerRadius={200}
                                fill="#8884d8"
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


export default ProviderPlayersPerPosition;