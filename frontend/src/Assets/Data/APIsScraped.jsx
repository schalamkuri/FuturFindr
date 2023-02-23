import gitlabPic from '../Pictures/Tools/gitlab.png'
import apartmentsPic from '../Pictures/Tools/apartments.png'
import adzunaPic from '../Pictures/Tools/adzuna.png'
import scorecardPic from '../Pictures/Tools/scorecard.png'

const apisScraped = [{
    name: "GitLab",
    desc: "Fetched commit, issue, and contributor data",
    link: "https://gitlab.com/",
    pic : gitlabPic
  }, {
    name: "Apartments.com",
    desc: "Fetched apartment and home listing info",
    link: "https://www.apartments.com/",
    pic : apartmentsPic
  }, {
    name: "Adzuna",
    desc: "Fetched job listings, employment info",
    link: "https://developer.adzuna.com/",
    pic : adzunaPic
  }, {
    name: "College Scorecard",
    desc: "Fetched college/university info",
    link: "https://collegescorecard.ed.gov/",
    pic : scorecardPic
  },
]

export { apisScraped };