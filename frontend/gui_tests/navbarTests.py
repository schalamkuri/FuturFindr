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
URL = "https://futurfindr.me/"

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
    # /html/body/div/nav/div/div[1]/a[1]
    # /html/body/div/div/nav/div/div/div/a[2]
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()


    def testNavAbout(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[1]").click()
        assert self.driver.current_url == URL + "about"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavColleges(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[2]").click()
        assert self.driver.current_url == URL + "colleges"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavJobs(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[3]").click()
        assert self.driver.current_url == URL + "jobs"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavHousing(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/div/div/a[4]").click()
        assert self.driver.current_url == URL + "housing"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL


    def testNavColleges2(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div/div[2]/div[1]/a").click()
        assert self.driver.current_url == URL + "colleges"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavJobs2(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div/div[2]/div[2]/a").click()
        assert self.driver.current_url == URL + "jobs"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavHousing2(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div/div[2]/div[3]/a").click()
        assert self.driver.current_url == URL + "housing"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavColleges3(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div/div[2]/div[1]/a").click()
        assert self.driver.current_url == URL + "colleges"

        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div[1]/div/div[1]/div/a/p[2]").click()
        assert self.driver.current_url == URL + "colleges/UniversityofTexasatAustin"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testNavColleges4(self):
        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div/div[2]/div[1]/a").click()
        assert self.driver.current_url == URL + "colleges"

        self.driver.find_element(by=By.XPATH, value="/html/body/div/div/div[1]/div/div[1]/div/a/p[2]").click()
        assert self.driver.current_url == URL + "colleges/TexasA&MUniversity"

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL


    def testNavLogo(self):
         self.driver.find_element(by=By.XPATH, value="/html/body/div/div/nav/div/a/div/h2").click()
         assert self.driver.current_url == URL
         currentURL = self.driver.current_url
         assert currentURL == URL

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])

    #
