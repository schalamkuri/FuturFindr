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
    name: "Reality Mole",
    desc: "Fetched apartment and home listing info",
    link: "https://www.realtymole.com/",
    pic : "https://rapidapi-prod-apis.s3.amazonaws.com/555f2cd7-bf13-4478-a87b-cdf50d92f8cb.png"
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
  }, {
    name: "Google Custom Search",
    desc: "Scraped for college/jobs images",
    link: "https://developers.google.com/custom-search/v1/introduction",
    pic : "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
  },
]

export { apisScraped };