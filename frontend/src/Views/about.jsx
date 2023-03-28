import React, { useState, useEffect } from 'react'
import axios from "axios"
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { aboutUs } from '../Assets/Data/AboutUs';
import { toolsUsed } from '../Assets/Data/ToolsUsed';
import { apisScraped } from '../Assets/Data/APIsScraped';
import DevCard from '../components/DevCard';
import ToolCard from '../components/ToolCard';
import APICard from '../components/APICard';

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
      totalTests = 32

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
        aboutUs.forEach((user) => {
          if (user.name === element.author.name || user.gitlab === element.author.username) {
          user.issues += 1
          totalIssues += 1
          }
        })
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
        {/* Description Section */}
        <Container className='p-4'>
          <h2 className='d-flex justify-content-left'>What is FuturFindr?</h2>
          <p>
            FuturFindr (pronounced future finder) is a platform that assists users in planning out their future by helping them find the right place to advance their education, find the right place to work in the real world, or finding a place to live for either of those. This is an all in one platform that is applicable to anyone who is interested in advancing themselves, whether it be a high school student, or someone who is looking to potentially switch careers, or someone who just wants to find a place to live from where their place of work or school is at.
          </p>
          <p>
          FuturFindr uses a React front-end combined with an SQL database to scrape and combine API data and present it back to you as nice, clean information cards. By connecting careers, education, and living spaces, with cards filled with relevant information and links to the necessary places, this results with a service that can make advancing yourself easier (and save you from opening so many chrome tabs)!
          </p>
        </Container>
        {/* Developer Section */}
        <Container className='p-4'>
          <h2 className='d-flex justify-content-left'>Developers</h2>
          { 
            ready ? (
              <Row>
                {
                  teamMembers.map((member) => {
                    return (
                      <Col sm='4'>
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
        {/* GitLab Repo Section */}
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
        {/* API Documentation Section */}
        <Container className='p-4'>
          <a href="https://documenter.getpostman.com/view/25807396/2s93CExcaC" target="_blank">
            <h3 className='d-flex justify-content-center'>Postman API Documentation</h3>
          </a>
        </Container>
        {/* Tools Section */}
        <Container className='p-4'>
          <h3 className='d-flex justify-content-center'>Tools We Used:</h3>
          { 
            ready ? (
              <Row>
                {
                  toolsUsed.map((tool) => {
                    return (
                      <Col sm='3'>
                        <ToolCard inputTool={tool}/>
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
        {/* API Section */}
        <Container className='p-4'>
          <h3 className='d-flex justify-content-center'>APIs We Scraped:</h3>
          { 
            ready ? (
              <Row>
                {
                  apisScraped.map((api) => {
                    return (
                      <Col sm='3'>
                        <APICard inputAPI={api}/>
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
      </Stack>
  )
}

export default About;
