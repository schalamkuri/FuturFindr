import gitlabPic from '../Pictures/Tools/gitlab.png'
import apartmentsPic from '../Pictures/Tools/apartments.png'
import linkupPic from '../Pictures/Tools/linkup.png'
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
    name: "LinkUp.com",
    desc: "Fetched job listing, employment info",
    link: "https://linkup.com/",
    pic : linkupPic
  }, {
    name: "College Scorecard",
    desc: "Fetched college/university info",
    link: "https://collegescorecard.ed.gov/",
    pic : scorecardPic
  },
]

export { apisScraped };