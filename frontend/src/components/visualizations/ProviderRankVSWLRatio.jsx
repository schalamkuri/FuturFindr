import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import { Spinner, Row, Col} from "react-bootstrap";
import { providerApi } from "../../Assets/Data/Constants";
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

function ProviderRankVSWLRatio() {
    /* State */
    const [rankList] = useState({});
    const [finalList] = useState([]);
    const [load, setLoad] = useState(false);
    var x = false;

    // makes the call to the backend to get data needed
    const getRankList = async () => {
        try {
        // will only make a call once new data is requested
        if (!load) {
            // Call api
            const response = await providerApi.get("teams")
            for (const team of response.data.data) {
                rankList[team.name] = [team.rank, +((team.totalWins / team.totalLosses).toFixed(2))]
            }
            for (const element in rankList) {
                finalList.push({name: element, rank: rankList[element][0], wl_ratio: rankList[element][1]})
            }
            setLoad(true);
        }
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        if (!x) {
            getRankList();
            x = true;
        }
    }, [finalList, load]);

    return (
        <div>
        {load ? (
        <Container fluid="md">
            <Row style={{ width: "100%", height: 600 }}>
                <h3 className="p-5 text-center">Team Rank vs Win/Loss Ratio</h3>
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
                            <XAxis type="number" dataKey="rank" name="Rank" />
                            <YAxis type="number" dataKey="wl_ratio" name="Win/Loss Ratio" />
                            <ZAxis dataKey="name" name="Name"/>
                            <Tooltip labelFormatter={() => { return ''; }} cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Names" data={finalList} fill="#2785c9" />
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


export default ProviderRankVSWLRatio;