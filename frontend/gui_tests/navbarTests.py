import os
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys

PATH = "./gui_tests/chromedriver"
URL = "https://www.futurfindr.me/"

class TestNavbar(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        ops = Options()
        ops.add_argument("--headless")
        ops.add_argument("--disable-gpu")
        ops.add_argument("--window-size=1280,800")
        ops.add_argument("--allow-insecure-localhost")
        ops.add_argument("--log-level=3")
        ops.add_argument("--no-sandbox")
        ops.add_argument("--disable-dev-shm-usage")

        cls.driver = webdriver.Chrome(PATH, options=ops)
        cls.driver.get(URL)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

# ---

    def testNavLogo(self):
         self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
         assert self.driver.current_url == URL
         currentURL = self.driver.current_url
         assert currentURL == URL

# each test (test[location1][location2]) tests jumping from location1 to location2 and vice versa
# ---

    def testHomeAbout(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div[1]/a[1]").click()
        assert self.driver.current_url == URL + "about"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL

    def testHomeColleges(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()
        assert self.driver.current_url == URL + "colleges"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL

    def testHomeJobs(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[3]").click()
        assert self.driver.current_url == URL + "jobs"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL

    def testHomeHousing(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[4]").click()
        assert self.driver.current_url == URL + "housing"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL

# ---

    def testAboutColleges(self):
        # set driver to about page
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[1]").click()

        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()
        assert self.driver.current_url == URL + "colleges"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[1]").click()
        assert self.driver.current_url == URL + "about"

    def testAboutJobs(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div[1]/a[3]").click()
        assert self.driver.current_url == URL + "jobs"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div[1]/a[1]").click()
        assert self.driver.current_url == URL + "about"

    def testAboutHousing(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[4]").click()
        assert self.driver.current_url == URL + "housing"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[1]").click()
        assert self.driver.current_url == URL + "about"

# ---
    
    def testCollegesJobs(self):
        # set driver to colleges page
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()

        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[3]").click()
        assert self.driver.current_url == URL + "jobs"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()
        assert self.driver.current_url == URL + "colleges"
    
    def testCollegesHousing(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[4]").click()
        assert self.driver.current_url == URL + "housing"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()
        assert self.driver.current_url == URL + "colleges"

# ---

    def testJobsHousing(self):
        # set driver to jobs page
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[3]").click()

        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[4]").click()
        assert self.driver.current_url == URL + "housing"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[3]").click()
        assert self.driver.current_url == URL + "jobs"


# ---

    def testHomeVisualizations(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[5]").click()
        assert self.driver.current_url == URL + "visualizations"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL
    
    def testHomeProviderVisualizations(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div[1]/a[6]").click()
        assert self.driver.current_url == URL + "pVisualizations"
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/a/div/h2").click()
        assert self.driver.current_url == URL

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])