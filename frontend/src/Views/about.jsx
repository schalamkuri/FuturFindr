import React, { useState, useEffect } from 'react'
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { aboutUs } from '../Assets/AboutUs';
import DevCard from '../Assets/DevCard';

// roughly based on GeoJobs's implementation 
// https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/src/views/About.jsx

const gitlabApi = axios.create({ baseURL: "https://gitlab.com/api/v4/", });
let x = false

const fetchRepositoryData = async () => {
  // Code that makes it so this can only be called once (had a bug where
  // commit numbers would be doubled because this was being called twice)
  if (x === false) {
    x = true
  } else {
    return
  }

  // Define totals
  let totalCommits = 0,
      totalIssues = 0,
      totalTests = 0

  // Get commits (call api, for each returned user find num of commits,
  // then increment total commits)
  await gitlabApi.get("projects/43389523/repository/contributors").then((response) => {
    response.data.forEach((element) => {
      aboutUs.forEach((user) => {
        if (user.name === element.name || user.gitlab === element.name ||
            user.email === element.email || user.email2 === element.email2) {
          user.commits += element.commits
        }
      })
      totalCommits += element.commits
    })
  });

  // Get issues (call api, for each returned issue increment issues of assigned
  // user, also increment total issues)
  await gitlabApi.get("projects/43389523/issues").then((response) => {
    response.data.forEach((element) => {
      element.assignees.forEach((assignee) => {
        aboutUs.forEach((user) => {
          if (user.name === assignee.name || user.gitlab === assignee.name ||
              user.email === assignee.email || user.email2 === element.email2)
          user.issues += 1
        })
      })
      totalIssues += 1
    })
  });

  // return info
  return {
    totalCommits: totalCommits,
    totalIssues: totalIssues,
    totalTests: totalTests,
    aboutUs: aboutUs
  }
}

function About() {
  // Initialize data
  const [ready, setReady] = useState(false)
  const [teamMembers, setTeamMembers] = useState([])
  const [totalCommits, setTotalCommits] = useState(0)
  const [totalIssues, setTotalIssues] = useState(0)
  const [totalTests, setTotalTests] = useState(0)


  // Get data from gitlab api, store it
  useEffect(() => {
    const fetchData = async () => {
			if (teamMembers === undefined || teamMembers.length === 0) {
				const gitlabInfo = await fetchRepositoryData()
				setTotalCommits(gitlabInfo.totalCommits)
				setTotalIssues(gitlabInfo.totalIssues)
				setTotalTests(gitlabInfo.totalTests)
				setTeamMembers(gitlabInfo.aboutUs)
        setReady(true)
			}
		}
		fetchData()
  }, [teamMembers])

  // Return actual page
  return (
    <Stack>
        <Container className='p-4'>
          { 
            ready ? (
              <Row>
                {
                  teamMembers.map((member) => {
                    return (
                      <Col>
                        <DevCard inputUser={member}/>
                      </Col>
                    )
                  }
                )
              }
              </Row>
            ) : (
              <Row>
                <Col className='d-flex justify-content-center'>
                  Loading
                </Col>
            </Row>
            )
          }
        </Container>
        <Container className='p-4 e'>
          <h3 className='d-flex justify-content-center'>Gitlab Repository Stats</h3>
          <Row >
            <Col className='d-flex justify-content-center'>Total Issues:</Col>
            <Col className='d-flex justify-content-center'>Total Commits:</Col>
            <Col className='d-flex justify-content-center'>Total Unit Tests:</Col>
          </Row>
          <Row >
            <Col className='d-flex justify-content-center'>{totalIssues}</Col>
            <Col className='d-flex justify-content-center'>{totalCommits}</Col>
            <Col className='d-flex justify-content-center'>{totalTests}</Col>
          </Row>
        </Container>
    </Stack>
  )
}

export default About;
